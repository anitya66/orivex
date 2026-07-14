package com.orivex.payment.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.orivex.payment.enums.PaymentMethod;
import com.orivex.payment.enums.PaymentStatus;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PaymentResponse {

    private Long id;

    private Long contractId;

    private String payerName;

    private String payeeName;

    private BigDecimal amount;

    private PaymentStatus status;

    private PaymentMethod method;

    private LocalDate paidAt;

}