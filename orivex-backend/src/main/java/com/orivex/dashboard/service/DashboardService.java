package com.orivex.dashboard.service;

import com.orivex.common.response.ApiResponse;
import com.orivex.dashboard.dto.AdminDashboardResponse;
import com.orivex.dashboard.dto.ClientDashboardResponse;
import com.orivex.dashboard.dto.FreelancerDashboardResponse;

public interface DashboardService {

    ApiResponse<FreelancerDashboardResponse> getFreelancerDashboard();

    ApiResponse<ClientDashboardResponse> getClientDashboard();

    ApiResponse<AdminDashboardResponse> getAdminDashboard();

}