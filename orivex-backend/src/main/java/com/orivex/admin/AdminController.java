package com.orivex.admin;

import com.orivex.admin.dto.ContractDetailsResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.orivex.contract.enums.ContractStatus;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.validation.Valid;
import com.orivex.project.enums.ProjectStatus;
import com.orivex.admin.dto.ContractDetailsResponse;
import com.orivex.admin.dto.DashboardResponse;
import com.orivex.admin.dto.ProjectDetailsResponse;
import com.orivex.admin.dto.UpdateProjectStatusRequest;
import com.orivex.admin.dto.UpdateUserStatusRequest;


import com.orivex.admin.dto.UserDetailsResponse;
import com.orivex.admin.service.AdminService;
import com.orivex.common.response.ApiResponse;
import com.orivex.project.enums.ProjectStatus;
import com.orivex.user.enums.AccountStatus;
import com.orivex.user.enums.UserRole;


import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/api/v1/admin/dashboard")
@PreAuthorize("hasRole('ADMIN')")
public ApiResponse<DashboardResponse> getDashboard() {

    return adminService.getDashboard();

}

    @GetMapping("/api/v1/admin/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<?> getUsers(

            @RequestParam(required = false) String keyword,

            @RequestParam(required = false) UserRole role,

            @RequestParam(required = false) AccountStatus status,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);

        return adminService.getUsers(
                keyword,
                role,
                status,
                pageable);

    }

    @GetMapping("/api/v1/admin/users/{userId}")
@PreAuthorize("hasRole('ADMIN')")
public ApiResponse<UserDetailsResponse> getUserDetails(
        @PathVariable Long userId) {

    return adminService.getUserDetails(userId);

}
@PatchMapping("/api/v1/admin/users/{userId}/status")
@PreAuthorize("hasRole('ADMIN')")
public ApiResponse<Void> updateUserStatus(

        @PathVariable Long userId,

        @Valid
        @RequestBody
        UpdateUserStatusRequest request) {

    return adminService.updateUserStatus(
            userId,
            request);

}
@DeleteMapping("/api/v1/admin/users/{userId}")
@PreAuthorize("hasRole('ADMIN')")
public ApiResponse<Void> deleteUser(
        @PathVariable Long userId) {

    return adminService.deleteUser(userId);

}

@GetMapping("/api/v1/admin/projects")
@PreAuthorize("hasRole('ADMIN')")
public ApiResponse<?> getProjects(

        @RequestParam(required = false)
        String keyword,

        @RequestParam(required = false)
        ProjectStatus status,

        @RequestParam(defaultValue = "0")
        int page,

        @RequestParam(defaultValue = "10")
        int size) {

    Pageable pageable = PageRequest.of(page, size);

    return adminService.getProjects(

            keyword,

            status,

            pageable);

}

@GetMapping("/api/v1/admin/projects/{projectId}")
@PreAuthorize("hasRole('ADMIN')")
public ApiResponse<ProjectDetailsResponse> getProjectDetails(

        @PathVariable Long projectId) {

    return adminService.getProjectDetails(projectId);

}

@PatchMapping("/api/v1/admin/projects/{projectId}/status")
@PreAuthorize("hasRole('ADMIN')")
public ApiResponse<Void> updateProjectStatus(

        @PathVariable Long projectId,

        @RequestBody @Valid
        UpdateProjectStatusRequest request

) {

    return adminService.updateProjectStatus(

            projectId,

            request

    );

}

@DeleteMapping("/api/v1/admin/projects/{projectId}")
@PreAuthorize("hasRole('ADMIN')")
public ApiResponse<Void> deleteProject(

        @PathVariable Long projectId) {

    return adminService.deleteProject(projectId);

}

@GetMapping("/api/v1/admin/contracts")
@PreAuthorize("hasRole('ADMIN')")
public ApiResponse<?> getContracts(

        @RequestParam(required = false) String keyword,

        @RequestParam(required = false) ContractStatus status,

        @RequestParam(defaultValue = "0") int page,

        @RequestParam(defaultValue = "10") int size

) {

    Pageable pageable = PageRequest.of(page, size);

    return adminService.getContracts(

            keyword,

            status,

            pageable

    );

}

@GetMapping("/api/v1/admin/contracts/{contractId}")
@PreAuthorize("hasRole('ADMIN')")
public ApiResponse<ContractDetailsResponse> getContractDetails(

        @PathVariable Long contractId

) {

    return adminService.getContractDetails(contractId);

}

@GetMapping("/api/v1/admin/activities")
@PreAuthorize("hasRole('ADMIN')")
public ApiResponse<?> getRecentActivities() {

    return adminService.getRecentActivities();

}




}