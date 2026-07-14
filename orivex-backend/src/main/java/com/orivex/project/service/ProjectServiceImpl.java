package com.orivex.project.service;

import com.orivex.common.dto.PagedResponse;
import java.util.List;
import com.orivex.activity.enums.ActivityType;
import com.orivex.activity.service.ActivityService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.orivex.project.specification.ProjectSpecification;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import com.orivex.common.exception.BadRequestException;
import com.orivex.common.response.ApiResponse;
import com.orivex.project.dto.CreateProjectRequest;
import com.orivex.project.dto.ProjectResponse;
import com.orivex.project.dto.UpdateProjectRequest;
import com.orivex.project.entity.Project;
import com.orivex.project.enums.ProjectStatus;
import com.orivex.project.mapper.ProjectMapper;
import com.orivex.project.repository.ProjectRepository;
import com.orivex.security.AuthenticationFacade;
import com.orivex.user.entity.ClientProfile;
import com.orivex.user.entity.User;
import com.orivex.user.repository.ClientProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {



    private final ProjectRepository projectRepository;

    private final ProjectMapper projectMapper;

    private final AuthenticationFacade authenticationFacade;

    private final ClientProfileRepository clientProfileRepository;

    private static final Logger logger = LoggerFactory.getLogger(ProjectServiceImpl.class);

    private final ActivityService activityService;

    @Override
    public ApiResponse<ProjectResponse> createProject(CreateProjectRequest request) {

            logger.info("Creating a new project.");

            User currentUser = authenticationFacade.getCurrentUser();

            logger.info("Current user: {}", currentUser.getEmail());

            ClientProfile client = clientProfileRepository
                            .findByUser(currentUser)
                            .orElseThrow(() -> new BadRequestException(
                                            "Client profile not found."));

            Project project = projectMapper.toEntity(request);

            project.setClient(client);
            project.setStatus(ProjectStatus.OPEN);

            logger.info("=================================================");
            logger.info("Title                : {}", project.getTitle());
            logger.info("Description          : {}", project.getDescription());
            logger.info("Category             : {}", project.getCategory());
            logger.info("Project Type         : {}", project.getProjectType());
            logger.info("Experience Level     : {}", project.getExperienceLevel());
            logger.info("Budget               : {}", project.getBudget());
            logger.info("Deadline             : {}", project.getDeadline());
            logger.info("Required Skills      : {}", project.getRequiredSkills());
            logger.info("Minimum Experience   : {}", project.getMinimumExperienceYears());
            logger.info("Status               : {}", project.getStatus());
            logger.info("=================================================");

            Project savedProject = projectRepository.save(project);

            activityService.logActivity(
                            currentUser,
                            ActivityType.PROJECT,
                            "Project Created",
                            "You created project \"" +
                                            savedProject.getTitle() +
                                            "\".");

            logger.info("Project created successfully. Project ID: {}",
                            savedProject.getId());

            ProjectResponse response = projectMapper.toResponse(savedProject);

            return ApiResponse.success(
                            response,
                            "Project created successfully.");
    }
    

    @Override
    public ApiResponse<List<ProjectResponse>> getMyProjects() {

        User currentUser = authenticationFacade.getCurrentUser();

        ClientProfile clientProfile = clientProfileRepository
                .findByUser(currentUser)
                .orElseThrow(() -> new BadRequestException(
                        "Client profile not found."));

        List<ProjectResponse> response = projectRepository
                .findByClient(clientProfile)
                .stream()
                .map(projectMapper::toResponse)
                .toList();

        return ApiResponse.success(
                response,
                "Projects fetched successfully.");

    }

    @Override
    public ApiResponse<ProjectResponse> getProjectById(
                    Long id) {

            Project project = projectRepository
                            .findById(id)
                            .orElseThrow(() -> new BadRequestException(
                                            "Project not found."));

            return ApiResponse.success(
                            projectMapper.toResponse(project),
                            "Project fetched successfully.");

    }
    
    @Override
    public ApiResponse<PagedResponse<ProjectResponse>> getProjects(

                    int page,
                    int size,
                    String sortBy,
                    String direction,
                    ProjectStatus status,
                    String keyword,
                    Double minBudget) {

            Sort sort = direction.equalsIgnoreCase("desc")
                            ? Sort.by(sortBy).descending()
                            : Sort.by(sortBy).ascending();

            Pageable pageable = PageRequest.of(
                            page,
                            size,
                            sort);

            Specification<Project> specification = Specification.where(ProjectSpecification.isNotDeleted());

            if (status != null) {

                    specification = specification.and(
                                    ProjectSpecification.hasStatus(status));

            }

            if (keyword != null && !keyword.isBlank()) {

                    specification = specification.and(
                                    ProjectSpecification.titleContains(keyword));

            }

            if (minBudget != null) {

                    specification = specification.and(
                                    ProjectSpecification.hasMinimumBudget(minBudget));

            }

            Page<Project> projects = projectRepository.findAll(
                            specification,
                            pageable);

            Page<ProjectResponse> projectPage = projects.map(
                            projectMapper::toResponse);

            PagedResponse<ProjectResponse> response = PagedResponse.<ProjectResponse>builder()
                            .content(projectPage.getContent())
                            .page(projectPage.getNumber())
                            .size(projectPage.getSize())
                            .totalItems(projectPage.getTotalElements())
                            .totalPages(projectPage.getTotalPages())
                            .hasNext(projectPage.hasNext())
                            .hasPrevious(projectPage.hasPrevious())
                            .build();

            return ApiResponse.success(
                            response,
                            "Projects fetched successfully.");

    }

    @Override
    public ApiResponse<PagedResponse<ProjectResponse>> getOpenProjects(
                    int page,
                    int size,
                    String keyword,
                    Double minBudget) {

            Pageable pageable = PageRequest.of(
                            page,
                            size,
                            Sort.by("createdAt").descending());

            Specification<Project> specification = Specification
                            .where(ProjectSpecification.isOpen())
                            .and(ProjectSpecification.isNotDeleted());

            if (keyword != null && !keyword.isBlank()) {

                    specification = specification.and(
                                    ProjectSpecification.titleContains(keyword));

            }

            if (minBudget != null) {

                    specification = specification.and(
                                    ProjectSpecification.hasMinimumBudget(minBudget));

            }

            Page<Project> projects = projectRepository.findAll(
                            specification,
                            pageable);

            Page<ProjectResponse> projectPage = projects.map(
                            projectMapper::toResponse);

            PagedResponse<ProjectResponse> response = PagedResponse.<ProjectResponse>builder()
                            .content(projectPage.getContent())
                            .page(projectPage.getNumber())
                            .size(projectPage.getSize())
                            .totalItems(projectPage.getTotalElements())
                            .totalPages(projectPage.getTotalPages())
                            .hasNext(projectPage.hasNext())
                            .hasPrevious(projectPage.hasPrevious())
                            .build();

            return ApiResponse.success(
                            response,
                            "Open projects fetched successfully.");
    }

    @Override
    public ApiResponse<PagedResponse<ProjectResponse>> searchProjects(
                    String keyword,
                    int page,
                    int size,
                    String sortBy,
                    String direction) {

            Sort sort = direction.equalsIgnoreCase("desc")
                            ? Sort.by(sortBy).descending()
                            : Sort.by(sortBy).ascending();

            Pageable pageable = PageRequest.of(
                            page,
                            size,
                            sort);

            Page<ProjectResponse> projectPage = projectRepository
                            .findByTitleContainingIgnoreCase(
                                            keyword,
                                            pageable)
                            .map(projectMapper::toResponse);

            PagedResponse<ProjectResponse> response = PagedResponse.<ProjectResponse>builder()
                            .content(projectPage.getContent())
                            .page(projectPage.getNumber())
                            .size(projectPage.getSize())
                            .totalItems(projectPage.getTotalElements())
                            .totalPages(projectPage.getTotalPages())
                            .hasNext(projectPage.hasNext())
                            .hasPrevious(projectPage.hasPrevious())
                            .build();

            return ApiResponse.success(
                            response,
                            "Projects fetched successfully.");

    }

    @Override
public ApiResponse<ProjectResponse> updateProject(
        Long id,
                UpdateProjectRequest request) {

        User currentUser = authenticationFacade.getCurrentUser();

        ClientProfile client = clientProfileRepository
                        .findByUser(currentUser)
                        .orElseThrow(() -> new BadRequestException("Client profile not found."));

        Project project = projectRepository
                        .findById(id)
                        .orElseThrow(() -> new BadRequestException("Project not found."));

        if (!project.getClient().getId().equals(client.getId())) {
                throw new BadRequestException(
                                "You are not allowed to update this project.");
        }

        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setCategory(request.getCategory());
        project.setProjectType(request.getProjectType());
        project.setExperienceLevel(request.getExperienceLevel());
        project.setBudget(request.getBudget());
        project.setDeadline(request.getDeadline());
        project.setRequiredSkills(request.getRequiredSkills());
        project.setMinimumExperienceYears(
                        request.getMinimumExperienceYears());

        Project updatedProject = projectRepository.save(project);

        return ApiResponse.success(
                        projectMapper.toResponse(updatedProject),
                        "Project updated successfully.");
}

@Override
public ApiResponse<Void> deleteProject(Long id) {

        User currentUser = authenticationFacade.getCurrentUser();

        ClientProfile client = clientProfileRepository
                        .findByUser(currentUser)
                        .orElseThrow(() -> new BadRequestException("Client profile not found."));

        Project project = projectRepository
                        .findById(id)
                        .orElseThrow(() -> new BadRequestException("Project not found."));

        if (!project.getClient().getId().equals(client.getId())) {
                throw new BadRequestException(
                                "You are not allowed to delete this project.");
        }

        project.setStatus(ProjectStatus.DELETED);

        projectRepository.save(project);


        return ApiResponse.success(
                        null,
                        "Project deleted successfully.");
}

@Override
public ApiResponse<ProjectResponse> closeProject(Long id) {

        User currentUser = authenticationFacade.getCurrentUser();

        ClientProfile client = clientProfileRepository
                        .findByUser(currentUser)
                        .orElseThrow(() -> new BadRequestException("Client profile not found."));

        Project project = projectRepository
                        .findById(id)
                        .orElseThrow(() -> new BadRequestException("Project not found."));

        if (!project.getClient().getId().equals(client.getId())) {

                throw new BadRequestException(
                                "You are not allowed to close this project.");
        }

        if (project.getStatus() == ProjectStatus.CANCELLED) {

                throw new BadRequestException(
                                "Project is already cancelled.");
        }

        project.setStatus(ProjectStatus.CANCELLED);

        Project savedProject = projectRepository.save(project);

        activityService.logActivity(
                        currentUser,
                        ActivityType.PROJECT,
                        "Project Closed",
                        "Project \"" +
                                        project.getTitle() +
                                        "\" has been closed.");

        return ApiResponse.success(
                        projectMapper.toResponse(savedProject),
                        "Project closed successfully.");
}


}