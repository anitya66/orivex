package com.orivex.admin.service;

import org.springframework.data.domain.Pageable;

import com.orivex.admin.dto.DashboardResponse;
import com.orivex.admin.dto.ProjectDetailsResponse;
import com.orivex.admin.dto.UpdateProjectStatusRequest;
import com.orivex.admin.dto.UpdateUserStatusRequest;
import com.orivex.admin.dto.UserDetailsResponse;

import com.orivex.common.response.ApiResponse;
import com.orivex.project.enums.ProjectStatus;
import com.orivex.user.enums.AccountStatus;
import com.orivex.user.enums.UserRole;

public interface AdminService {

    ApiResponse<?> getUsers(
            String keyword,
            UserRole role,
            AccountStatus status,
            Pageable pageable);

    ApiResponse<UserDetailsResponse> getUserDetails(Long userId);
    
    ApiResponse<Void> updateUserStatus(
        Long userId,
            UpdateUserStatusRequest request);
        
    ApiResponse<Void> deleteUser(Long userId);
    
    ApiResponse<?> getProjects(
        String keyword,
        ProjectStatus status,
            Pageable pageable);

    ApiResponse<ProjectDetailsResponse> getProjectDetails(
            Long projectId);
        
    ApiResponse<Void> updateProjectStatus(
            Long projectId,
            UpdateProjectStatusRequest request);

    ApiResponse<Void> deleteProject(Long projectId);

    ApiResponse<DashboardResponse> getDashboard();

    ApiResponse<?> getRecentActivities();                  

}