package com.orivex.admin.dto;

import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Getter
@Builder
public class DashboardResponse {

    private long totalUsers;

    private long admins;

    private long clients;

    private long freelancers;

    private long totalProjects;

    private long openProjects;

    private long inProgressProjects;

    private long completedProjects;

    private long cancelledProjects;

    private long suspendedProjects;

    private long totalContracts;

    private long activeContracts;

    private long completedContracts;

    private List<ChartData> projectStatusChart;

    private List<MonthlyChartData> userGrowth;

    private List<MonthlyChartData> projectGrowth;

}