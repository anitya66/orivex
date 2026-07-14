package com.orivex.payment.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateOrderResponse {

    private String orderId;

    private Integer amount;

    private String currency;

    private Long paymentId;

}