package com.orivex.dashboard.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orivex.common.response.ApiResponse;
import com.orivex.dashboard.dto.AdminDashboardResponse;
import com.orivex.dashboard.dto.ClientDashboardResponse;
import com.orivex.dashboard.dto.FreelancerDashboardResponse;
import com.orivex.dashboard.service.DashboardService;
import com.orivex.security.AuthenticationFacade;
import com.orivex.user.entity.User;
import com.orivex.user.enums.UserRole;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final AuthenticationFacade authenticationFacade;

    @GetMapping
    public ApiResponse<?> getDashboard() {

        User currentUser = authenticationFacade.getCurrentUser();

        if (currentUser.getRole() == UserRole.CLIENT) {
            return dashboardService.getClientDashboard();
        }

        if (currentUser.getRole() == UserRole.FREELANCER) {
            return dashboardService.getFreelancerDashboard();
        }

        return dashboardService.getAdminDashboard();
    }
}