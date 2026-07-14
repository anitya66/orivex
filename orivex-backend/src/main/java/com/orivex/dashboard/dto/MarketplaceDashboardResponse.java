package com.orivex.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import com.orivex.project.entity.Project;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MarketplaceDashboardResponse {

    private Long totalOpenProjects;

    private Long totalFreelancers;

    private Long totalClients;

    private List<Project> latestProjects;

}