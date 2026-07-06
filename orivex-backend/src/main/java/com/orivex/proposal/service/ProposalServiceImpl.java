package com.orivex.proposal.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.orivex.user.entity.ClientProfile;
import com.orivex.common.response.ApiResponse;
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

    Project project = projectRepository
            .findById(projectId)
            .orElseThrow(() -> new BadRequestException(
                    "Project not found."));

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

    /* Accept Selected Proposal */

    proposal.setStatus(
            ProposalStatus.ACCEPTED);

    proposalRepository.save(proposal);

    /* Update Project */

    project.setStatus(
            ProjectStatus.IN_PROGRESS);

    projectRepository.save(project);

    /* Reject Other Pending Proposals */

    List<Proposal> pendingProposals = proposalRepository.findByProjectAndStatus(
            project,
            ProposalStatus.PENDING);

    for (Proposal pendingProposal : pendingProposals) {

        if (!pendingProposal.getId().equals(proposal.getId())) {

            pendingProposal.setStatus(
                    ProposalStatus.REJECTED);

            proposalRepository.save(
                    pendingProposal);
        }
    }

    return ApiResponse.success(
            proposalMapper.toResponse(proposal),
            "Proposal accepted successfully.");
}

@Override
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

    proposal.setStatus(
            ProposalStatus.REJECTED);

    Proposal savedProposal = proposalRepository.save(proposal);

    return ApiResponse.success(
            proposalMapper.toResponse(savedProposal),
            "Proposal rejected successfully.");
}

}