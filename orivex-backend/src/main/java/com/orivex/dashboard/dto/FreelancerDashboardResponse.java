package com.orivex.dashboard.dto;

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

    /**
     * Indicates whether the freelancer has completed
     * the marketplace profile.
     */
    private Boolean profileCompleted;

    /**
     * Dashboard Statistics
     */
    private Long totalApplications;

    private Long acceptedProposals;

    private Long rejectedProposals;

    private Long activeContracts;

    private Long completedContracts;

}