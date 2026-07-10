package com.orivex.admin.dto;

import com.orivex.project.enums.ProjectStatus;

import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProjectStatusRequest {

    @NotNull
    private ProjectStatus status;

}