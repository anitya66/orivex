package com.orivex.contract.service;

import java.util.List;

import com.orivex.common.response.ApiResponse;
import com.orivex.contract.dto.ContractResponse;
import com.orivex.contract.dto.SubmitWorkRequest;
import com.orivex.proposal.entity.Proposal;

public interface ContractService {

    ApiResponse<List<ContractResponse>> getMyContracts();

    ApiResponse<List<ContractResponse>> getClientContracts();

    ApiResponse<ContractResponse> getContractById(
            Long contractId);

    void createContract(
            Proposal acceptedProposal);

    ApiResponse<String> startContract(
            Long contractId);

    ApiResponse<String> submitWork(
            Long contractId,
            SubmitWorkRequest request);

    ApiResponse<String> approveContract(
            Long contractId);

}