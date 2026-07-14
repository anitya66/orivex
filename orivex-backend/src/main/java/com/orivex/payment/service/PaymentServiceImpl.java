package com.orivex.payment.service;

import java.nio.charset.StandardCharsets;
import java.util.List;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;




import org.springframework.beans.factory.annotation.Value;

import com.orivex.payment.dto.VerifyPaymentRequest;
import com.orivex.contract.enums.ContractStatus;
import com.orivex.activity.enums.ActivityType;
import com.orivex.activity.service.ActivityService;
import com.orivex.notification.enums.NotificationType;

import com.orivex.common.exception.BadRequestException;
import com.orivex.common.response.ApiResponse;
import com.orivex.contract.entity.Contract;
import com.orivex.contract.repository.ContractRepository;

import com.orivex.notification.helper.NotificationHelper;
import com.orivex.payment.dto.CreatePaymentRequest;
import com.orivex.payment.dto.PaymentResponse;

import com.orivex.payment.entity.Payment;
import com.orivex.payment.enums.PaymentMethod;
import com.orivex.payment.enums.PaymentStatus;
import com.orivex.payment.mapper.PaymentMapper;
import org.json.JSONObject;

import com.razorpay.Order;
import com.razorpay.RazorpayException;

import com.orivex.payment.dto.CreateOrderResponse;
import com.orivex.payment.repository.PaymentRepository;
import com.orivex.security.AuthenticationFacade;
import com.orivex.user.entity.User;
import com.razorpay.RazorpayClient;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

     private final PaymentRepository paymentRepository;

    private final ContractRepository contractRepository;

    private final PaymentMapper paymentMapper;

    private final AuthenticationFacade authenticationFacade;

    private final RazorpayClient razorpayClient;

    private final ActivityService activityService;

private final NotificationHelper notificationHelper;

@Value("${razorpay.key-secret}")
private String razorpaySecret;


    @Override
public ApiResponse<PaymentResponse> createPayment(
                CreatePaymentRequest request) {

        User currentUser = authenticationFacade.getCurrentUser();

        Contract contract = contractRepository
                        .findById(request.getContractId())
                        .orElseThrow(() -> new BadRequestException(
                                        "Contract not found."));

        if (!contract.getClient()
                        .getUser()
                        .getId()
                        .equals(currentUser.getId())) {

                throw new BadRequestException(
                                "Only the client can make the payment.");
        }

        // Return existing payment if already created
        Payment existingPayment = paymentRepository
                        .findByContract(contract)
                        .orElse(null);

        if (existingPayment != null) {

                return ApiResponse.success(
                                paymentMapper.toResponse(existingPayment),
                                "Existing payment fetched successfully.");
        }

        // Create new payment
        Payment payment = Payment.builder()
                        .contract(contract)
                        .payer(contract.getClient().getUser())
                        .payee(contract.getFreelancer().getUser())
                        .amount(contract.getAgreedBudget())
                        .status(PaymentStatus.PENDING)
                        .method(PaymentMethod.RAZORPAY)
                        .build();

        Payment savedPayment = paymentRepository.save(payment);

        return ApiResponse.success(
                        paymentMapper.toResponse(savedPayment),
                        "Payment created successfully.");
}

    @Override
    public ApiResponse<List<PaymentResponse>> getMyPayments() {

        User currentUser = authenticationFacade.getCurrentUser();

        List<Payment> payments;

        if (currentUser.getRole().name().equals("CLIENT")) {

            payments = paymentRepository
                    .findByPayerOrderByCreatedAtDesc(currentUser);

        } else {

            payments = paymentRepository
                    .findByPayeeOrderByCreatedAtDesc(currentUser);
        }

        List<PaymentResponse> response = payments
                .stream()
                .map(paymentMapper::toResponse)
                .toList();

        return ApiResponse.success(
                response,
                "Payments fetched successfully.");
    }

    @Override
    public ApiResponse<PaymentResponse> getPaymentById(
                    Long paymentId) {

            User currentUser = authenticationFacade.getCurrentUser();

            Payment payment = paymentRepository
                            .findById(paymentId)
                            .orElseThrow(() -> new BadRequestException(
                                            "Payment not found."));

            boolean isPayer = payment
                            .getPayer()
                            .getId()
                            .equals(currentUser.getId());

            boolean isPayee = payment
                            .getPayee()
                            .getId()
                            .equals(currentUser.getId());

            if (!isPayer && !isPayee) {

                    throw new BadRequestException(
                                    "You are not authorized to view this payment.");
            }

            return ApiResponse.success(
                            paymentMapper.toResponse(payment),
                            "Payment fetched successfully.");
    }

    @Override
    public ApiResponse<CreateOrderResponse> createOrder(
                    Long paymentId) {

            Payment payment = paymentRepository
                            .findById(paymentId)
                            .orElseThrow(() -> new BadRequestException(
                                            "Payment not found."));

            if (payment.getStatus() != PaymentStatus.PENDING) {

                    throw new BadRequestException(
                                    "Payment has already been processed.");
            }

            try {

                    JSONObject options = new JSONObject();

                    options.put(
                                    "amount",
                                    payment.getAmount()
                                                    .multiply(java.math.BigDecimal.valueOf(100))
                                                    .intValue());

                    options.put(
                                    "currency",
                                    "INR");

                    options.put(
                                    "receipt",
                                    "payment_" + payment.getId());

                    Order order = razorpayClient.orders
                                    .create(options);

                    payment.setGatewayOrderId(
                                    order.get("id"));

                    paymentRepository.save(payment);

                    CreateOrderResponse response = CreateOrderResponse.builder()
                                    .orderId(order.get("id"))
                                    .amount(order.get("amount"))
                                    .currency(order.get("currency"))
                                    .paymentId(payment.getId())
                                    .build();

                    return ApiResponse.success(
                                    response,
                                    "Razorpay order created successfully.");

            } catch (RazorpayException e) {

                    throw new BadRequestException(
                                    "Unable to create Razorpay order.");
            }

    }

    @Override
public ApiResponse<String> verifyPayment(
        VerifyPaymentRequest request) {

    Payment payment = paymentRepository
            .findById(request.getPaymentId())
            .orElseThrow(() ->
                    new BadRequestException(
                            "Payment not found."));

    if (payment.getStatus() == PaymentStatus.SUCCESS) {

        throw new BadRequestException(
                "Payment already verified.");
    }

    try {

        String payload =
                request.getRazorpayOrderId()
                        + "|"
                        + request.getRazorpayPaymentId();

        Mac sha256 =
                Mac.getInstance("HmacSHA256");

        SecretKeySpec secretKey =
                new SecretKeySpec(
                        razorpaySecret.getBytes(
                                StandardCharsets.UTF_8),
                        "HmacSHA256");

        sha256.init(secretKey);

        byte[] hash =
                sha256.doFinal(
                        payload.getBytes(
                                StandardCharsets.UTF_8));

        StringBuilder generated =
                new StringBuilder();

        for (byte b : hash) {

            generated.append(
                    String.format("%02x", b));

        }

        if (!generated.toString().equals(
                request.getRazorpaySignature())) {

            throw new BadRequestException(
                    "Invalid payment signature.");

        }

        payment.setGatewayPaymentId(
                request.getRazorpayPaymentId());

        payment.setGatewaySignature(
                request.getRazorpaySignature());

        payment.setStatus(
                PaymentStatus.SUCCESS);

        payment.setPaidAt(
                java.time.LocalDate.now());

        payment.getContract()
                .setStatus(
                        ContractStatus.PAID);

        paymentRepository.save(payment);

        activityService.logActivity(
                payment.getPayer(),
                ActivityType.PAYMENT,
                "Payment Completed",
                "Payment completed for project \""
                        + payment.getContract()
                                .getProject()
                                .getTitle()
                        + "\".");

        notificationHelper.createNotification(
                payment.getPayee(),
                NotificationType.PAYMENT,
                "Payment Received",
                "Payment received for project \""
                        + payment.getContract()
                                .getProject()
                                .getTitle()
                        + "\".");

        notificationHelper.createNotification(
                payment.getPayer(),
                NotificationType.PAYMENT,
                "Payment Successful",
                "Your payment was successful.");

        return ApiResponse.success(
                "Payment verified successfully.");

    } catch (Exception e) {

        throw new BadRequestException(
                "Payment verification failed.");

    }

}

}