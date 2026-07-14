package com.orivex.proposal.service;

import java.util.List;

import org.slf4j.Logger;
import com.orivex.activity.enums.ActivityType;
import com.orivex.activity.service.ActivityService;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.orivex.notification.enums.NotificationType;
import com.orivex.notification.helper.NotificationHelper;
import com.orivex.user.entity.ClientProfile;
import com.orivex.common.response.ApiResponse;
import com.orivex.contract.service.ContractService;
import com.orivex.project.entity.Project;
import com.orivex.project.enums.ProjectStatus;
import com.orivex.project.repository.ProjectRepository;
import com.orivex.proposal.dto.CreateProposalRequest;
import com.orivex.proposal.dto.ProposalResponse;
import com.orivex.proposal.entity.Proposal;
import com.orivex.proposal.enums.ProposalStatus;
import com.orivex.proposal.mapper.ProposalMapper;
import com.orivex.proposal.repository.ProposalRepository;
import com.orivex.security.AuthenticationFacade;
import com.orivex.user.entity.FreelancerProfile;
import com.orivex.user.repository.FreelancerProfileRepository;
import com.orivex.common.exception.BadRequestException;
import com.orivex.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProposalServiceImpl implements ProposalService {

        private static final Logger logger = LoggerFactory.getLogger(ProposalServiceImpl.class);

        private final ProposalRepository proposalRepository;

        private final ProjectRepository projectRepository;

        private final ProposalMapper proposalMapper;

        private final AuthenticationFacade authenticationFacade;

        private final FreelancerProfileRepository freelancerProfileRepository;

        private final NotificationHelper notificationHelper;

        private final ContractService contractService;

        private final ActivityService activityService;

        @Override
        public ApiResponse<ProposalResponse> createProposal(
                        CreateProposalRequest request) {

                logger.info("Creating proposal for project id: {}",
                                request.getProjectId());

                User currentUser = authenticationFacade.getCurrentUser();

                FreelancerProfile freelancer = freelancerProfileRepository
                                .findByUser(currentUser)
                                .orElseThrow(() -> new BadRequestException(
                                                "Freelancer profile not found."));

                Project project = projectRepository
                                .findById(request.getProjectId())
                                .orElseThrow(() -> new BadRequestException(
                                                "Project not found."));

                if (project.getStatus() != ProjectStatus.OPEN) {
                        throw new BadRequestException(
                                        "Project is not open for proposals.");
                }

                if (project.getClient()
                                .getUser()
                                .getId()
                                .equals(currentUser.getId())) {

                        throw new BadRequestException(
                                        "You cannot apply to your own project.");
                }

                boolean alreadyApplied = proposalRepository
                                .existsByProjectAndFreelancer(
                                                project,
                                                freelancer);

                if (alreadyApplied) {
                        throw new BadRequestException(
                                        "You have already applied to this project.");
                }

                Proposal proposal = proposalMapper.toEntity(request);

                proposal.setProject(project);

                proposal.setFreelancer(freelancer);

                proposal.setStatus(ProposalStatus.PENDING);

                Proposal savedProposal = proposalRepository.save(proposal);

                notificationHelper.createNotification(
                                project.getClient().getUser(),
                                NotificationType.PROPOSAL,
                                "New Proposal",
                                freelancer.getUser().getName()
                                                + " submitted a proposal for project \""
                                                + project.getTitle()
                                                + "\".");

                logger.info("Proposal created successfully. Id: {}",
                                savedProposal.getId());

                return ApiResponse.success(
                                proposalMapper.toResponse(savedProposal),
                                "Proposal submitted successfully.");
        }

        @Override
        public ApiResponse<List<ProposalResponse>> getMyProposals() {

                User currentUser = authenticationFacade.getCurrentUser();

                FreelancerProfile freelancer = freelancerProfileRepository
                                .findByUser(currentUser)
                                .orElseThrow(() -> new BadRequestException(
                                                "Freelancer profile not found."));

                List<ProposalResponse> response = proposalRepository
                                .findByFreelancer(freelancer)
                                .stream()
                                .map(proposalMapper::toResponse)
                                .toList();

                return ApiResponse.success(
                                response,
                                "Proposals fetched successfully.");
        }

        @Override
        public ApiResponse<List<ProposalResponse>> getProjectProposals(
                        Long projectId) {

                User currentUser = authenticationFacade.getCurrentUser();

                Project project = projectRepository
                                .findById(projectId)
                                .orElseThrow(() -> new BadRequestException(
                                                "Project not found."));

                // Only the project owner can view proposals
                if (!project.getClient()
                                .getUser()
                                .getId()
                                .equals(currentUser.getId())) {

                        throw new BadRequestException(
                                        "You are not authorized to view proposals for this project.");
                }

                List<ProposalResponse> response = proposalRepository
                                .findByProject(project)
                                .stream()
                                .map(proposalMapper::toResponse)
                                .toList();

                return ApiResponse.success(
                                response,
                                "Project proposals fetched successfully.");
        }

        @Override
        @Transactional
        public ApiResponse<ProposalResponse> acceptProposal(
                        Long proposalId) {

                Proposal proposal = proposalRepository
                                .findById(proposalId)
                                .orElseThrow(() -> new BadRequestException(
                                                "Proposal not found."));

                User currentUser = authenticationFacade.getCurrentUser();

                ClientProfile client = proposal
                                .getProject()
                                .getClient();

                if (!client.getUser().getId().equals(currentUser.getId())) {

                        throw new BadRequestException(
                                        "You are not authorized to accept this proposal.");
                }

                if (proposal.getStatus() != ProposalStatus.PENDING) {

                        throw new BadRequestException(
                                        "Only pending proposals can be accepted.");
                }

                Project project = proposal.getProject();

                proposal.setStatus(ProposalStatus.ACCEPTED);

                proposalRepository.saveAndFlush(proposal);

                contractService.createContract(proposal);

                project.setStatus(ProjectStatus.IN_PROGRESS);

                projectRepository.saveAndFlush(project);

                List<Proposal> pendingProposals = proposalRepository.findByProjectAndStatus(
                                project,
                                ProposalStatus.PENDING);

                for (Proposal pendingProposal : pendingProposals) {

                        if (!pendingProposal.getId().equals(proposal.getId())) {

                                pendingProposal.setStatus(
                                                ProposalStatus.REJECTED);

                                proposalRepository.saveAndFlush(
                                                pendingProposal);
                        }
                }

                Proposal updatedProposal = proposalRepository
                                .findById(proposal.getId())
                                .orElseThrow();

                notificationHelper.createNotification(
                                updatedProposal.getFreelancer().getUser(),
                                NotificationType.PROPOSAL,
                                "Proposal Accepted",
                                "Congratulations! Your proposal for project \""
                                                + updatedProposal.getProject().getTitle()
                                                + "\" has been accepted.");

                activityService.logActivity(
                                currentUser,
                                ActivityType.PROPOSAL,
                                "Proposal Accepted",
                                "You accepted the proposal for project \""
                                                + updatedProposal.getProject().getTitle()
                                                + "\".");

                return ApiResponse.success(
                                proposalMapper.toResponse(updatedProposal),
                                "Proposal accepted successfully.");
        }

        @Override
        @Transactional
        public ApiResponse<ProposalResponse> rejectProposal(
                        Long id) {

                User currentUser = authenticationFacade.getCurrentUser();

                Proposal proposal = proposalRepository
                                .findById(id)
                                .orElseThrow(() -> new BadRequestException(
                                                "Proposal not found."));

                if (!proposal.getProject()
                                .getClient()
                                .getUser()
                                .getId()
                                .equals(currentUser.getId())) {

                        throw new BadRequestException(
                                        "You are not authorized to reject this proposal.");
                }

                if (proposal.getStatus() != ProposalStatus.PENDING) {

                        throw new BadRequestException(
                                        "Proposal has already been processed.");
                }

                proposal.setStatus(ProposalStatus.REJECTED);

                Proposal savedProposal = proposalRepository.save(proposal);

                notificationHelper.createNotification(
                                savedProposal.getFreelancer().getUser(),
                                NotificationType.PROPOSAL,
                                "Proposal Rejected",
                                "Your proposal for project \""
                                                + savedProposal.getProject().getTitle()
                                                + "\" has been rejected.");

                activityService.logActivity(
                                currentUser,
                                ActivityType.PROPOSAL,
                                "Proposal Rejected",
                                "You rejected the proposal for project \""
                                                + savedProposal.getProject().getTitle()
                                                + "\".");

                return ApiResponse.success(
                                proposalMapper.toResponse(savedProposal),
                                "Proposal rejected successfully.");
        }

        @Override
        @Transactional
        public ApiResponse<ProposalResponse> withdrawProposal(
                        Long proposalId) {

                User currentUser = authenticationFacade.getCurrentUser();

                FreelancerProfile freelancer = freelancerProfileRepository
                                .findByUser(currentUser)
                                .orElseThrow(() -> new BadRequestException(
                                                "Freelancer profile not found."));

                Proposal proposal = proposalRepository
                                .findById(proposalId)
                                .orElseThrow(() -> new BadRequestException(
                                                "Proposal not found."));

                if (!proposal.getFreelancer()
                                .getId()
                                .equals(freelancer.getId())) {

                        throw new BadRequestException(
                                        "You are not authorized to withdraw this proposal.");
                }

                if (proposal.getStatus() != ProposalStatus.PENDING) {

                        throw new BadRequestException(
                                        "Only pending proposals can be withdrawn.");
                }

                proposal.setStatus(
                                ProposalStatus.WITHDRAWN);

                Proposal savedProposal = proposalRepository.save(proposal);

                notificationHelper.createNotification(
                                proposal.getProject().getClient().getUser(),
                                NotificationType.PROPOSAL,
                                "Proposal Withdrawn",
                                freelancer.getUser().getName()
                                                + " has withdrawn the proposal for project \""
                                                + proposal.getProject().getTitle()
                                                + "\".");

                activityService.logActivity(
                                currentUser,
                                ActivityType.PROPOSAL,
                                "Proposal Withdrawn",
                                "You withdrew your proposal for project \""
                                                + savedProposal.getProject().getTitle()
                                                + "\".");

                return ApiResponse.success(
                                proposalMapper.toResponse(savedProposal),
                                "Proposal withdrawn successfully.");
        }
}