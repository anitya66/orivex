package com.orivex.payment.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.orivex.payment.dto.PaymentResponse;
import com.orivex.payment.entity.Payment;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    @Mapping(target = "contractId", source = "contract.id")

    @Mapping(target = "payerName", source = "payer.name")

    @Mapping(target = "payeeName", source = "payee.name")

    PaymentResponse toResponse(
            Payment payment);

}