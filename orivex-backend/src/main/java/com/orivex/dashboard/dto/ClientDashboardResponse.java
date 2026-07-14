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
public class ClientDashboardResponse {

    /**
     * Indicates whether the client has completed
     * the marketplace profile.
     */
    private Boolean profileCompleted;

    /**
     * Dashboard Statistics
     */
    private Long totalProjects;

    private Long openProjects;

    private Long closedProjects;

    private Long activeContracts;

    private Long completedContracts;

    private Long pendingProposals;

}