package com.orivex.payment.controller;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.orivex.common.response.ApiResponse;
import com.orivex.payment.dto.CreateOrderResponse;
import com.orivex.payment.dto.CreatePaymentRequest;
import com.orivex.payment.dto.PaymentResponse;
import com.orivex.payment.dto.VerifyPaymentRequest;
import com.orivex.payment.service.PaymentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
@Validated
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ApiResponse<PaymentResponse> createPayment(
            @Valid @RequestBody CreatePaymentRequest request) {

        return paymentService.createPayment(request);
    }

    @GetMapping
    public ApiResponse<List<PaymentResponse>> getMyPayments() {

        return paymentService.getMyPayments();
    }

    @GetMapping("/{paymentId}")
    public ApiResponse<PaymentResponse> getPaymentById(
            @PathVariable Long paymentId) {

        return paymentService.getPaymentById(paymentId);
    }

    @PostMapping("/{paymentId}/order")
    public ApiResponse<CreateOrderResponse> createOrder(
            @PathVariable Long paymentId) {

        return paymentService.createOrder(paymentId);
    }
@PostMapping("/verify")
public ApiResponse<String> verifyPayment(
        @Valid @RequestBody
        VerifyPaymentRequest request) {

    return paymentService.verifyPayment(request);

}


}