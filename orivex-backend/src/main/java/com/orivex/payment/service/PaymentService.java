package com.orivex.payment.service;

import java.util.List;

import com.orivex.common.response.ApiResponse;
import com.orivex.payment.dto.CreateOrderResponse;
import com.orivex.payment.dto.CreatePaymentRequest;
import com.orivex.payment.dto.PaymentResponse;
import com.orivex.payment.dto.VerifyPaymentRequest;

public interface PaymentService {

    ApiResponse<PaymentResponse> createPayment(
            CreatePaymentRequest request);

    ApiResponse<List<PaymentResponse>> getMyPayments();

    ApiResponse<PaymentResponse> getPaymentById(
                    Long paymentId);

    ApiResponse<CreateOrderResponse> createOrder(
                    Long paymentId);
        
    ApiResponse<String> verifyPayment(
                    VerifyPaymentRequest request);
                        

}