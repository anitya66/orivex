package com.orivex.admin.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.orivex.admin.dto.ContractResponse;
import com.orivex.contract.entity.Contract;

@Mapper(componentModel = "spring")
public interface AdminContractMapper {

    @Mapping(target = "projectTitle", source = "project.title")
    @Mapping(target = "clientName", source = "client.companyName")
    @Mapping(target = "freelancerName", source = "freelancer.user.name")
    ContractResponse toResponse(Contract contract);

}