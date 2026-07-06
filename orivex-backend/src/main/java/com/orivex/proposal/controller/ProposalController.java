package com.orivex.proposal.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.orivex.common.response.ApiResponse;
import com.orivex.proposal.dto.CreateProposalRequest;
import com.orivex.proposal.dto.ProposalResponse;
import com.orivex.proposal.service.ProposalService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "Proposal Management", description = "APIs for managing project proposals")
@RestController
@RequestMapping("/api/v1/proposals")
@RequiredArgsConstructor
public class ProposalController {

    private final ProposalService proposalService;

    @Operation(summary = "Apply to Project", description = "Allows an authenticated freelancer to apply for a project.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Proposal submitted successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation failed"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping
    public ApiResponse<ProposalResponse> createProposal(
            @Valid @RequestBody CreateProposalRequest request) {

        return proposalService.createProposal(request);
    }

    @Operation(summary = "Get My Proposals", description = "Returns all proposals submitted by the authenticated freelancer.")
    @GetMapping("/my")
    public ApiResponse<List<ProposalResponse>> getMyProposals() {

        return proposalService.getMyProposals();
    }

    @Operation(summary = "Accept Proposal", description = "Allows the project owner to accept a proposal.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Proposal accepted successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid proposal"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PutMapping("/{id}/accept")
    public ApiResponse<ProposalResponse> acceptProposal(
            @PathVariable Long id) {

        return proposalService.acceptProposal(id);
    }
    
    @Operation(summary = "Reject Proposal", description = "Allows the project owner to reject a proposal.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Proposal rejected successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid proposal"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PutMapping("/{id}/reject")
    public ApiResponse<ProposalResponse> rejectProposal(
            @PathVariable Long id) {

        return proposalService.rejectProposal(id);
    }

}