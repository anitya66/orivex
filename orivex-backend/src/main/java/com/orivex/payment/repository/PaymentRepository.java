package com.orivex.payment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orivex.contract.entity.Contract;
import com.orivex.payment.entity.Payment;
import com.orivex.payment.enums.PaymentStatus;
import com.orivex.user.entity.User;

public interface PaymentRepository
        extends JpaRepository<Payment, Long> {

    Optional<Payment> findByContract(
            Contract contract);

    List<Payment> findByPayerOrderByCreatedAtDesc(
            User payer);

    List<Payment> findByPayeeOrderByCreatedAtDesc(
            User payee);

    List<Payment> findByStatus(
            PaymentStatus status);

    long countByStatus(
            PaymentStatus status);

}