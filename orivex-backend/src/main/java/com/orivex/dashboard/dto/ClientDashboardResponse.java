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
public class ClientDashboardResponse {

    private Long totalProjects;

    private Long openProjects;

    private Long completedProjects;

    private Long activeContracts;

    private Long completedContracts;

    private Long pendingBids;

    private BigDecimal totalSpent;

}