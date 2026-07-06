package com.orivex.proposal.dto;

import java.math.BigDecimal;

import com.orivex.proposal.enums.ProposalStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProposalResponse {

    private Long id;

    private Long projectId;

    private String projectTitle;

    private Long freelancerId;

    private String freelancerName;

    private String freelancerEmail;

    private String coverLetter;

    private BigDecimal proposedBudget;

    private Integer estimatedDays;

    private ProposalStatus status;

}