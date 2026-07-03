package com.orivex.contract.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.orivex.bid.entity.Bid;
import com.orivex.common.exception.BadRequestException;
import com.orivex.common.response.ApiResponse;
import com.orivex.contract.dto.ContractResponse;
import com.orivex.contract.dto.SubmitWorkRequest;
import com.orivex.contract.entity.Contract;
import com.orivex.contract.enums.ContractStatus;
import com.orivex.contract.mapper.ContractMapper;
import com.orivex.contract.repository.ContractRepository;
import com.orivex.notification.enums.NotificationType;
import com.orivex.notification.helper.NotificationHelper;
import com.orivex.security.AuthenticationFacade;
import com.orivex.user.entity.ClientProfile;
import com.orivex.user.entity.FreelancerProfile;
import com.orivex.user.entity.User;
import com.orivex.user.repository.ClientProfileRepository;
import com.orivex.user.repository.FreelancerProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

        private final ContractRepository contractRepository;

        private final FreelancerProfileRepository freelancerProfileRepository;

        private final ClientProfileRepository clientProfileRepository;

        private final AuthenticationFacade authenticationFacade;

        private final ContractMapper contractMapper;

        private final NotificationHelper notificationHelper;

        @Override
        public ApiResponse<List<ContractResponse>> getMyContracts() {

                User currentUser = authenticationFacade.getCurrentUser();

                FreelancerProfile freelancer = freelancerProfileRepository
                                .findByUser(currentUser)
                                .orElseThrow(() -> new BadRequestException(
                                                "Freelancer profile not found."));

                List<ContractResponse> response = contractRepository
                                .findByFreelancer(freelancer)
                                .stream()
                                .map(contractMapper::toResponse)
                                .collect(Collectors.toList());

                return ApiResponse.success(
                                response,
                                "Contracts fetched successfully.");

        }

        @Override
        public ApiResponse<List<ContractResponse>> getClientContracts() {

                User currentUser = authenticationFacade.getCurrentUser();

                ClientProfile client = clientProfileRepository
                                .findByUser(currentUser)
                                .orElseThrow(() -> new BadRequestException(
                                                "Client profile not found."));

                List<ContractResponse> response = contractRepository
                                .findByClient(client)
                                .stream()
                                .map(contractMapper::toResponse)
                                .collect(Collectors.toList());

                return ApiResponse.success(
                                response,
                                "Contracts fetched successfully.");

        }

        @Override
        public ApiResponse<ContractResponse> getContractById(
                        Long contractId) {

                User currentUser = authenticationFacade.getCurrentUser();

                Contract contract = contractRepository.findById(contractId)
                                .orElseThrow(() -> new BadRequestException(
                                                "Contract not found."));

                boolean isClient = contract.getClient()
                                .getUser()
                                .getId()
                                .equals(currentUser.getId());

                boolean isFreelancer = contract.getFreelancer()
                                .getUser()
                                .getId()
                                .equals(currentUser.getId());

                if (!isClient && !isFreelancer) {

                        throw new BadRequestException(
                                        "You are not authorized to view this contract.");

                }

                ContractResponse response = contractMapper.toResponse(contract);

                return ApiResponse.success(
                                response,
                                "Contract fetched successfully.");

        }

    @Override
    public void createContract(Bid acceptedBid) {

        if (contractRepository.existsByBid(acceptedBid)) {

            throw new BadRequestException(
                    "Contract already exists for this bid.");

        }

        Contract contract = Contract.builder()
                .project(acceptedBid.getProject())
                .client(acceptedBid.getProject().getClient())
                .freelancer(acceptedBid.getFreelancer())
                .bid(acceptedBid)
                .agreedBudget(acceptedBid.getProposedBudget())
                .deadline(acceptedBid.getProject().getDeadline())
                .status(ContractStatus.PENDING)
                .build();

        Contract savedContract = contractRepository.save(contract);

        notificationHelper.createNotification(
                savedContract.getFreelancer().getUser(),
                NotificationType.CONTRACT,
                "New Contract",
                "A new contract has been created for project \""
                        + savedContract.getProject().getTitle()
                        + "\".");

        notificationHelper.createNotification(
                savedContract.getClient().getUser(),
                NotificationType.CONTRACT,
                "Contract Created",
                "Contract for project \""
                        + savedContract.getProject().getTitle()
                        + "\" has been created successfully.");

    }

    @Override
    public ApiResponse<String> startContract(
                    Long contractId) {

            User currentUser = authenticationFacade.getCurrentUser();

            Contract contract = contractRepository.findById(contractId)
                            .orElseThrow(() -> new BadRequestException(
                                            "Contract not found."));

            if (!contract.getFreelancer()
                            .getUser()
                            .getId()
                            .equals(currentUser.getId())) {

                    throw new BadRequestException(
                                    "Only the assigned freelancer can start this contract.");

            }

            if (contract.getStatus() != ContractStatus.PENDING) {

                    throw new BadRequestException(
                                    "Only pending contracts can be started.");

            }

            contract.setStatus(ContractStatus.ACTIVE);

            contract.setStartedAt(LocalDate.now());

            contractRepository.save(contract);

            notificationHelper.createNotification(
                            contract.getClient().getUser(),
                            NotificationType.CONTRACT,
                            "Contract Started",
                            "Work has started on project \""
                                            + contract.getProject().getTitle()
                                            + "\".");

            return ApiResponse.success(
                            "Contract started successfully.");

    }

    @Override
    public ApiResponse<String> submitWork(
                    Long contractId,
                    SubmitWorkRequest request) {

            User currentUser = authenticationFacade.getCurrentUser();

            Contract contract = contractRepository.findById(contractId)
                            .orElseThrow(() -> new BadRequestException(
                                            "Contract not found."));

            if (!contract.getFreelancer()
                            .getUser()
                            .getId()
                            .equals(currentUser.getId())) {

                    throw new BadRequestException(
                                    "Only the assigned freelancer can submit work.");

            }

            if (contract.getStatus() != ContractStatus.ACTIVE) {

                    throw new BadRequestException(
                                    "Only active contracts can be submitted.");

            }

            contract.setSubmissionUrl(request.getSubmissionUrl());

            contract.setSubmissionNotes(request.getSubmissionNotes());

            contract.setSubmittedAt(LocalDate.now());

            contract.setStatus(ContractStatus.SUBMITTED);

            contractRepository.save(contract);

            notificationHelper.createNotification(
                            contract.getClient().getUser(),
                            NotificationType.CONTRACT,
                            "Work Submitted",
                            "The freelancer has submitted work for project \""
                                            + contract.getProject().getTitle()
                                            + "\".");

            return ApiResponse.success(
                            "Work submitted successfully.");

    }

    @Override
    public ApiResponse<String> approveContract(
                    Long contractId) {

            User currentUser = authenticationFacade.getCurrentUser();

            Contract contract = contractRepository.findById(contractId)
                            .orElseThrow(() -> new BadRequestException(
                                            "Contract not found."));

            if (!contract.getClient()
                            .getUser()
                            .getId()
                            .equals(currentUser.getId())) {

                    throw new BadRequestException(
                                    "Only the client can approve this contract.");

            }

            if (contract.getStatus() != ContractStatus.SUBMITTED) {

                    throw new BadRequestException(
                                    "Only submitted contracts can be approved.");

            }

            contract.setStatus(ContractStatus.COMPLETED);

            contractRepository.save(contract);

            notificationHelper.createNotification(
                            contract.getFreelancer().getUser(),
                            NotificationType.CONTRACT,
                            "Contract Completed",
                            "Congratulations! Your work for project \""
                                            + contract.getProject().getTitle()
                                            + "\" has been approved.");

            return ApiResponse.success(
                            "Contract approved successfully.");

    }

}