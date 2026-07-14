package com.orivex.proposal.service;

import java.util.List;

import com.orivex.common.response.ApiResponse;
import com.orivex.proposal.dto.CreateProposalRequest;
import com.orivex.proposal.dto.ProposalResponse;

public interface ProposalService {

    ApiResponse<ProposalResponse> createProposal(
            CreateProposalRequest request);

    ApiResponse<List<ProposalResponse>> getMyProposals();

    ApiResponse<List<ProposalResponse>> getProjectProposals(
            Long projectId);

    ApiResponse<ProposalResponse> acceptProposal(
            Long proposalId);

    ApiResponse<ProposalResponse> rejectProposal(
                    Long id);

    ApiResponse<ProposalResponse> withdrawProposal(Long proposalId);        
}