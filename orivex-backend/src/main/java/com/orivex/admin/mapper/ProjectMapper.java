package com.orivex.admin.mapper;

import org.springframework.stereotype.Component;

import com.orivex.admin.dto.ProjectResponse;
import com.orivex.project.entity.Project;

@Component
public class ProjectMapper {

    public ProjectResponse toResponse(Project project) {

        return ProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .clientName(project.getClient().getCompanyName())
                .budget(project.getBudget())
                .deadline(project.getDeadline())
                .status(project.getStatus())
                .build();

    }

}