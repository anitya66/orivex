package com.orivex.project.service;

import java.util.List;

import com.orivex.project.dto.UpdateProjectRequest;
import com.orivex.common.dto.PagedResponse;
import com.orivex.common.response.ApiResponse;
import com.orivex.project.dto.CreateProjectRequest;
import com.orivex.project.dto.ProjectResponse;

import com.orivex.project.enums.ProjectStatus;

public interface ProjectService {

    ApiResponse<ProjectResponse> createProject(
            CreateProjectRequest request);

    ApiResponse<List<ProjectResponse>> getMyProjects();

    ApiResponse<ProjectResponse> getProjectById(
                    Long id);
            
    ApiResponse<PagedResponse<ProjectResponse>> getProjects(
                    int page,
                    int size,
                    String sortBy,
                    String direction,
                    ProjectStatus status,
                    String keyword,
                    Double minBudget);
        
    ApiResponse<PagedResponse<ProjectResponse>> searchProjects(
                    String keyword,
                    int page,
                    int size,
                    String sortBy,
                    String direction);

     ApiResponse<ProjectResponse> updateProject(
        Long id,
                     UpdateProjectRequest request);
        
     ApiResponse<Void> deleteProject(Long id);
     
     ApiResponse<ProjectResponse> closeProject(Long id);
}