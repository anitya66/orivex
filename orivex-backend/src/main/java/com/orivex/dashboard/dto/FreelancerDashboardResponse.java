package com.orivex.dashboard.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FreelancerDashboardResponse {

    private Integer profileCompletion;

    private Long totalBids;

    private Long acceptedBids;

    private Long rejectedBids;

    private Long activeContracts;

    private Long completedContracts;

    private Double averageRating;

    private BigDecimal totalEarnings;

}