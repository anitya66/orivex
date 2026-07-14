package com.orivex.dashboard.service;

import org.springframework.stereotype.Service;

import com.orivex.common.response.ApiResponse;
import com.orivex.contract.repository.ContractRepository;
import com.orivex.dashboard.dto.AdminDashboardResponse;
import com.orivex.dashboard.dto.ClientDashboardResponse;
import com.orivex.dashboard.dto.FreelancerDashboardResponse;
import com.orivex.project.repository.ProjectRepository;
import com.orivex.proposal.repository.ProposalRepository;
import com.orivex.security.AuthenticationFacade;
import com.orivex.user.entity.ClientProfile;
import com.orivex.user.entity.FreelancerProfile;
import com.orivex.user.entity.User;
import com.orivex.user.repository.ClientProfileRepository;
import com.orivex.user.repository.FreelancerProfileRepository;
import com.orivex.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final AuthenticationFacade authenticationFacade;

    private final UserRepository userRepository;

    private final ClientProfileRepository clientProfileRepository;

    private final FreelancerProfileRepository freelancerProfileRepository;

    private final ProjectRepository projectRepository;

    private final ProposalRepository proposalRepository;

    private final ContractRepository contractRepository;

    @Override
    public ApiResponse<ClientDashboardResponse> getClientDashboard() {

            User currentUser = authenticationFacade.getCurrentUser();

            var clientProfile = clientProfileRepository.findByUser(currentUser);

            // User has not created a client profile yet
            if (clientProfile.isEmpty()) {

                    ClientDashboardResponse response = ClientDashboardResponse.builder()
                                    .profileCompleted(false)
                                    .totalProjects(0L)
                                    .openProjects(0L)
                                    .closedProjects(0L)
                                    .activeContracts(0L)
                                    .completedContracts(0L)
                                    .pendingProposals(0L)
                                    .build();

                    return ApiResponse.success(
                                    response,
                                    "Complete your profile to unlock all marketplace features.");
            }

            ClientProfile client = clientProfile.get();

            long totalProjects = projectRepository.countByClient(client);

            long openProjects = projectRepository.countByClientAndStatus(
                            client,
                            com.orivex.project.enums.ProjectStatus.OPEN);

            long closedProjects = projectRepository.countByClientAndStatus(
                            client,
                            com.orivex.project.enums.ProjectStatus.CANCELLED);

            long activeContracts = contractRepository.countByClientAndStatus(
                            client,
                            com.orivex.contract.enums.ContractStatus.ACTIVE);

            long completedContracts = contractRepository.countByClientAndStatus(
                            client,
                            com.orivex.contract.enums.ContractStatus.COMPLETED);

            long pendingProposals = projectRepository.findByClient(client)
                            .stream()
                            .mapToLong(project -> proposalRepository.countByProjectAndStatus(
                                            project,
                                            com.orivex.proposal.enums.ProposalStatus.PENDING))
                            .sum();

            ClientDashboardResponse response = ClientDashboardResponse.builder()
                            .profileCompleted(true)
                            .totalProjects(totalProjects)
                            .openProjects(openProjects)
                            .closedProjects(closedProjects)
                            .activeContracts(activeContracts)
                            .completedContracts(completedContracts)
                            .pendingProposals(pendingProposals)
                            .build();

            return ApiResponse.success(
                            response,
                            "Client dashboard fetched successfully.");
    }

    @Override
    public ApiResponse<FreelancerDashboardResponse> getFreelancerDashboard() {

            User currentUser = authenticationFacade.getCurrentUser();

            var freelancerProfile = freelancerProfileRepository.findByUser(currentUser);

            // User has not created a freelancer profile yet
            if (freelancerProfile.isEmpty()) {

                    FreelancerDashboardResponse response = FreelancerDashboardResponse.builder()
                                    .profileCompleted(false)
                                    .totalApplications(0L)
                                    .acceptedProposals(0L)
                                    .rejectedProposals(0L)
                                    .activeContracts(0L)
                                    .completedContracts(0L)
                                    .build();

                    return ApiResponse.success(
                                    response,
                                    "Complete your profile to unlock all marketplace features.");
            }

            FreelancerProfile freelancer = freelancerProfile.get();

            long totalApplications = proposalRepository.countByFreelancer(freelancer);

            long acceptedProposals = proposalRepository.countByFreelancerAndStatus(
                            freelancer,
                            com.orivex.proposal.enums.ProposalStatus.ACCEPTED);

            long rejectedProposals = proposalRepository.countByFreelancerAndStatus(
                            freelancer,
                            com.orivex.proposal.enums.ProposalStatus.REJECTED);

            long activeContracts = contractRepository.countByFreelancerAndStatus(
                            freelancer,
                            com.orivex.contract.enums.ContractStatus.ACTIVE);

            long completedContracts = contractRepository.countByFreelancerAndStatus(
                            freelancer,
                            com.orivex.contract.enums.ContractStatus.COMPLETED);

            FreelancerDashboardResponse response = FreelancerDashboardResponse.builder()
                            .profileCompleted(true)
                            .totalApplications(totalApplications)
                            .acceptedProposals(acceptedProposals)
                            .rejectedProposals(rejectedProposals)
                            .activeContracts(activeContracts)
                            .completedContracts(completedContracts)
                            .build();

            return ApiResponse.success(
                            response,
                            "Freelancer dashboard fetched successfully.");
    }

    @Override
    public ApiResponse<AdminDashboardResponse> getAdminDashboard() {

        long totalUsers = userRepository.count();

        long totalFreelancers = userRepository.countByRole(
                com.orivex.user.enums.UserRole.FREELANCER);

        long totalClients = userRepository.countByRole(
                com.orivex.user.enums.UserRole.CLIENT);

        long totalProjects = projectRepository.count();

        long openProjects = projectRepository.countByStatus(
                com.orivex.project.enums.ProjectStatus.OPEN);

        long closedProjects = projectRepository.countByStatus(
                com.orivex.project.enums.ProjectStatus.CANCELLED);

        long totalContracts = contractRepository.count();

        // Review module not implemented yet
        long totalReviews = 0L;

        AdminDashboardResponse response = AdminDashboardResponse.builder()
                .totalUsers(totalUsers)
                .totalFreelancers(totalFreelancers)
                .totalClients(totalClients)
                .totalProjects(totalProjects)
                .openProjects(openProjects)
                .closedProjects(closedProjects)
                .totalContracts(totalContracts)
                .totalReviews(totalReviews)
                .build();

        return ApiResponse.success(
                response,
                "Admin dashboard fetched successfully.");
    }
}