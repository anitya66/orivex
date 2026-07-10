package com.orivex.admin.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.orivex.project.enums.ExperienceLevel;
import com.orivex.project.enums.ProjectCategory;
import com.orivex.project.enums.ProjectStatus;
import com.orivex.project.enums.ProjectType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProjectDetailsResponse {

    private Long id;

    private String title;

    private String description;

    private String clientName;

    private BigDecimal budget;

    private LocalDate deadline;

    private ProjectCategory category;

    private ProjectType projectType;

    private ExperienceLevel experienceLevel;

    private String requiredSkills;

    private Integer minimumExperienceYears;

    private ProjectStatus status;

    private LocalDateTime createdAt;

}