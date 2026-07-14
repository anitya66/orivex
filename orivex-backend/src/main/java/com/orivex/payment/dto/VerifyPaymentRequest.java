package com.orivex.payment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyPaymentRequest {

    @NotNull(message = "Payment id is required.")
    private Long paymentId;

    @NotBlank(message = "Order id is required.")
    private String razorpayOrderId;

    @NotBlank(message = "Payment id is required.")
    private String razorpayPaymentId;

    @NotBlank(message = "Signature is required.")
    private String razorpaySignature;

}