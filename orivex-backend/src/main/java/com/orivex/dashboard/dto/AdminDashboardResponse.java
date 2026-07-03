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
public class AdminDashboardResponse {

    private Long totalUsers;

    private Long totalFreelancers;

    private Long totalClients;

    private Long totalProjects;

    private Long openProjects;

    private Long completedProjects;

    private Long totalContracts;

    private Long totalReviews;

}