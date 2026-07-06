package com.orivex.proposal.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.orivex.proposal.dto.CreateProposalRequest;
import com.orivex.proposal.dto.ProposalResponse;
import com.orivex.proposal.entity.Proposal;

@Mapper(componentModel = "spring")
public interface ProposalMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "project", ignore = true)
    @Mapping(target = "freelancer", ignore = true)
    @Mapping(target = "status", ignore = true)
    Proposal toEntity(CreateProposalRequest request);

    @Mapping(target = "projectId", source = "project.id")
    @Mapping(target = "projectTitle", source = "project.title")
    @Mapping(target = "freelancerId", source = "freelancer.id")
    @Mapping(target = "freelancerName", source = "freelancer.user.name")
    @Mapping(target = "freelancerEmail", source = "freelancer.user.email")
    ProposalResponse toResponse(Proposal proposal);

}