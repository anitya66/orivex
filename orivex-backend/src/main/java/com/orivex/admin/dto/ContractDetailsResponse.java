package com.orivex.admin.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.orivex.contract.enums.ContractStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ContractDetailsResponse {

    private Long id;

    private String projectTitle;

    private String clientName;

    private String freelancerName;

    private BigDecimal agreedBudget;

    private LocalDate deadline;

    private ContractStatus status;

    private String submissionUrl;

    private String submissionNotes;

    private LocalDate startedAt;

    private LocalDate submittedAt;

    private LocalDateTime createdAt;

}