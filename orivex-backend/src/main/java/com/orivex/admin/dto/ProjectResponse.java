package com.orivex.admin.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.orivex.project.enums.ProjectStatus;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProjectResponse {

    private Long id;

    private String title;

    private String clientName;

    private BigDecimal budget;

    private LocalDate deadline;

    private ProjectStatus status;

}