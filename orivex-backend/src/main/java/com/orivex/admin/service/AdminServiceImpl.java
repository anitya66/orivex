package com.orivex.admin.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import com.orivex.project.entity.Project;
import com.orivex.project.enums.ProjectStatus;
import com.orivex.project.repository.ProjectRepository;
import com.orivex.admin.dto.ChartData;
import com.orivex.admin.dto.DashboardResponse;
import com.orivex.admin.dto.MonthlyChartData;
import com.orivex.admin.dto.ProjectDetailsResponse;
import java.util.List;
import com.orivex.contract.enums.ContractStatus;


import com.orivex.contract.repository.ContractRepository;

import com.orivex.admin.dto.ProjectResponse;
import com.orivex.admin.dto.UpdateProjectStatusRequest;
import com.orivex.admin.mapper.ProjectMapper;
import com.orivex.admin.specification.ProjectSpecification;
import com.orivex.admin.dto.UpdateUserStatusRequest;
import com.orivex.admin.dto.UserDetailsResponse;
import com.orivex.admin.dto.UserResponse;
import com.orivex.admin.mapper.UserMapper;
import com.orivex.admin.specification.UserSpecification;
import com.orivex.common.exception.BadRequestException;
import com.orivex.common.exception.ResourceNotFoundException;
import com.orivex.common.response.ApiResponse;
import java.util.ArrayList;
import java.util.Comparator;


import com.orivex.admin.dto.RecentActivityResponse;


import com.orivex.security.AuthenticationFacade;
import com.orivex.user.entity.FreelancerProfile;
import com.orivex.user.entity.User;
import com.orivex.user.enums.AccountStatus;
import com.orivex.user.enums.UserRole;
import com.orivex.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

        private final UserRepository userRepository;

        private final UserMapper userMapper;

        private final AuthenticationFacade authenticationFacade;

        private final ProjectRepository projectRepository;

        private final ProjectMapper projectMapper;


        private final ContractRepository contractRepository;



        @Override
        public ApiResponse<?> getUsers(
                        String keyword,
                        UserRole role,
                        AccountStatus status,
                        Pageable pageable) {

                Specification<User> specification = UserSpecification.filter(
                                keyword,
                                role,
                                status);

                Page<User> users = userRepository.findAll(
                                specification,
                                pageable);

                Page<UserResponse> response = users.map(userMapper::toResponse);

                return ApiResponse.success(
                                response,
                                "Users fetched successfully.");

        }

        @Override
        public ApiResponse<UserDetailsResponse> getUserDetails(
                        Long userId) {

                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "User not found."));

                UserDetailsResponse.UserDetailsResponseBuilder builder = UserDetailsResponse.builder()
                                .id(user.getId())
                                .name(user.getName())
                                .email(user.getEmail())
                                .role(user.getRole())
                                .accountStatus(user.getAccountStatus())
                                .createdAt(user.getCreatedAt());

                if (user.getFreelancerProfile() != null) {

                        FreelancerProfile profile = user.getFreelancerProfile();

                        builder.bio(profile.getBio())
                                        .skills(profile.getSkills())
                                        .experienceYears(profile.getExperienceYears())
                                        .hourlyRate(profile.getHourlyRate())
                                        .portfolioUrl(profile.getPortfolioUrl())
                                        .githubUrl(profile.getGithubUrl())
                                        .linkedinUrl(profile.getLinkedinUrl())
                                        .resumeUrl(profile.getResumeUrl())
                                        .profileImage(profile.getProfileImage());

                }

                return ApiResponse.success(
                                builder.build(),
                                "User details fetched successfully.");

        }

        @Override
        public ApiResponse<Void> updateUserStatus(
                        Long userId,
                        UpdateUserStatusRequest request) {

                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "User not found."));

                user.setAccountStatus(
                                request.getStatus());

                userRepository.save(user);

                return ApiResponse.success(
                                null,
                                "User status updated successfully.");

        }

        @Override
        public ApiResponse<Void> deleteUser(
                        Long userId) {

                User currentAdmin = authenticationFacade.getCurrentUser();

                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "User not found."));

                // Admin cannot delete himself
                if (currentAdmin.getId().equals(userId)) {

                        throw new BadRequestException(
                                        "You cannot delete your own account.");

                }

                // Prevent deleting the last admin
                if (user.getRole() == UserRole.ADMIN) {

                        long adminCount = userRepository.countByRole(
                                        UserRole.ADMIN);

                        if (adminCount <= 1) {

                                throw new BadRequestException(
                                                "Cannot delete the last admin.");

                        }

                }

                // Soft Delete
                user.setAccountStatus(
                                AccountStatus.DELETED);

                userRepository.save(user);

                return ApiResponse.success(
                                null,
                                "User deleted successfully.");

        }

        @Override
public ApiResponse<?> getProjects(
        String keyword,
        ProjectStatus status,
                Pageable pageable) {

        Page<Project> projects = projectRepository.findAll(

                        ProjectSpecification.filter(
                                        keyword,
                                        status),

                        pageable);

        Page<ProjectResponse> response = projects.map(projectMapper::toResponse);

        return ApiResponse.success(
                        response,
                        "Projects fetched successfully.");

}

@Override
public ApiResponse<ProjectDetailsResponse> getProjectDetails(
                Long projectId) {

        Project project = projectRepository.findById(projectId)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                        "Project not found."));

        ProjectDetailsResponse response = ProjectDetailsResponse.builder()

                        .id(project.getId())
                        .title(project.getTitle())
                        .description(project.getDescription())
                        .clientName(project.getClient().getCompanyName())
                        .budget(project.getBudget())
                        .deadline(project.getDeadline())
                        .category(project.getCategory())
                        .projectType(project.getProjectType())
                        .experienceLevel(project.getExperienceLevel())
                        .requiredSkills(project.getRequiredSkills())
                        .minimumExperienceYears(project.getMinimumExperienceYears())
                        .status(project.getStatus())
                        .createdAt(project.getCreatedAt())

                        .build();

        return ApiResponse.success(
                        response,
                        "Project details fetched successfully.");

}

@Override
public ApiResponse<Void> updateProjectStatus(

        Long projectId,

        UpdateProjectStatusRequest request

) {

        Project project = projectRepository.findById(projectId)

                        .orElseThrow(() ->

                        new ResourceNotFoundException(

                                        "Project not found."

                        )

                        );

        project.setStatus(

                        request.getStatus()

        );

        projectRepository.save(project);

        return ApiResponse.success(

                        null,

                        "Project status updated successfully."

        );

}

@Override
public ApiResponse<Void> deleteProject(Long projectId) {

        Project project = projectRepository.findById(projectId)
                        .orElseThrow(() -> new ResourceNotFoundException(
                                        "Project not found."));

        project.setStatus(ProjectStatus.DELETED);

        projectRepository.save(project);

        return ApiResponse.success(
                        null,
                        "Project deleted successfully.");

}

@Override
public ApiResponse<DashboardResponse> getDashboard() {

        List<ChartData> projectChart = List.of(

                        new ChartData(
                                        "OPEN",
                                        projectRepository.countByStatus(ProjectStatus.OPEN)),

                        new ChartData(
                                        "IN_PROGRESS",
                                        projectRepository.countByStatus(ProjectStatus.IN_PROGRESS)),

                        new ChartData(
                                        "COMPLETED",
                                        projectRepository.countByStatus(ProjectStatus.COMPLETED)),

                        new ChartData(
                                        "CANCELLED",
                                        projectRepository.countByStatus(ProjectStatus.CANCELLED)),

                        new ChartData(
                                        "SUSPENDED",
                                        projectRepository.countByStatus(ProjectStatus.SUSPENDED))

        );

        List<MonthlyChartData> userGrowth = userRepository.getMonthlyUserGrowth()

                        .stream()

                        .map(row -> new MonthlyChartData(

                                        getMonthName(

                                                        ((Number) row[0]).intValue()

                                        ),

                                        ((Number) row[1]).longValue()

                        ))

                        .toList();

        List<MonthlyChartData> projectGrowth = projectRepository.getMonthlyProjectGrowth()

                        .stream()

                        .map(row -> new MonthlyChartData(

                                        getMonthName(

                                                        ((Number) row[0]).intValue()

                                        ),

                                        ((Number) row[1]).longValue()

                        ))

                        .toList();

        DashboardResponse response = DashboardResponse.builder()

                        .totalUsers(
                                        userRepository.count())

                        .admins(
                                        userRepository.countByRole(UserRole.ADMIN))

                        .clients(
                                        userRepository.countByRole(UserRole.CLIENT))

                        .freelancers(
                                        userRepository.countByRole(UserRole.FREELANCER))

                        .totalProjects(
                                        projectRepository.count())

                        .openProjects(
                                        projectRepository.countByStatus(ProjectStatus.OPEN))

                        .inProgressProjects(
                                        projectRepository.countByStatus(ProjectStatus.IN_PROGRESS))

                        .completedProjects(
                                        projectRepository.countByStatus(ProjectStatus.COMPLETED))

                        .cancelledProjects(
                                        projectRepository.countByStatus(ProjectStatus.CANCELLED))

                        .suspendedProjects(
                                        projectRepository.countByStatus(ProjectStatus.SUSPENDED))

                        .totalContracts(
                                        contractRepository.count())

                        .activeContracts(
                                        contractRepository.countByStatus(ContractStatus.ACTIVE))

                        .completedContracts(
                                        contractRepository.countByStatus(ContractStatus.COMPLETED))

                        .projectStatusChart(projectChart)

                        .userGrowth(userGrowth)

                        .projectGrowth(projectGrowth)

                        .build();

        return ApiResponse.success(
                        response,
                        "Dashboard fetched successfully.");

}

private String getMonthName(int month) {

        return switch (month) {

                case 1 -> "Jan";

                case 2 -> "Feb";

                case 3 -> "Mar";

                case 4 -> "Apr";

                case 5 -> "May";

                case 6 -> "Jun";

                case 7 -> "Jul";

                case 8 -> "Aug";

                case 9 -> "Sep";

                case 10 -> "Oct";

                case 11 -> "Nov";

                case 12 -> "Dec";

                default -> "";

        };

}

@Override
public ApiResponse<?> getRecentActivities() {

        List<RecentActivityResponse> activities = new ArrayList<>();

        // Latest Users
        userRepository.findTop5ByOrderByCreatedAtDesc()

                        .forEach(user ->

                        activities.add(

                                        RecentActivityResponse.builder()

                                                        .title("New User")

                                                        .description(
                                                                        user.getName()
                                                                                        + " registered as "
                                                                                        + user.getRole())

                                                        .createdAt(
                                                                        user.getCreatedAt())

                                                        .type("USER")

                                                        .build()

                        ));

        // Latest Projects
        projectRepository.findTop5ByOrderByCreatedAtDesc()

                        .forEach(project ->

                        activities.add(

                                        RecentActivityResponse.builder()

                                                        .title("New Project")

                                                        .description(
                                                                        project.getTitle()
                                                                                        + " posted")

                                                        .createdAt(
                                                                        project.getCreatedAt())

                                                        .type("PROJECT")

                                                        .build()

                        ));

        // Latest Contracts
        contractRepository.findTop5ByOrderByCreatedAtDesc()

                        .forEach(contract ->

                        activities.add(

                                        RecentActivityResponse.builder()

                                                        .title("New Contract")

                                                        .description(
                                                                        "Contract #"
                                                                                        + contract.getId()
                                                                                        + " created")

                                                        .createdAt(
                                                                        contract.getCreatedAt())

                                                        .type("CONTRACT")

                                                        .build()

                        ));

        activities.sort(
                        Comparator.comparing(
                                        RecentActivityResponse::getCreatedAt).reversed());

        return ApiResponse.success(

                        activities.stream()
                                        .limit(10)
                                        .toList(),

                        "Recent activities fetched successfully."

        );
}

}