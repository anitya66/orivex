package com.orivex.activity.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.orivex.activity.entity.Activity;
import com.orivex.activity.enums.ActivityType;
import com.orivex.activity.mapper.ActivityMapper;
import com.orivex.activity.repository.ActivityRepository;
import org.springframework.stereotype.Service;
import com.orivex.project.repository.ProjectRepository;
import com.orivex.proposal.repository.ProposalRepository;
import com.orivex.contract.repository.ContractRepository;
import com.orivex.review.repository.ReviewRepository;
import com.orivex.user.entity.ClientProfile;
import com.orivex.user.entity.FreelancerProfile;
import com.orivex.user.repository.ClientProfileRepository;
import com.orivex.user.repository.FreelancerProfileRepository;
import com.orivex.activity.dto.ActivityResponse;
import com.orivex.common.response.ApiResponse;
import com.orivex.security.AuthenticationFacade;
import com.orivex.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {

    private final AuthenticationFacade authenticationFacade;

    private final ClientProfileRepository clientProfileRepository;

    private final FreelancerProfileRepository freelancerProfileRepository;

    private final ProjectRepository projectRepository;

    private final ProposalRepository proposalRepository;

    private final ContractRepository contractRepository;

    private final ReviewRepository reviewRepository;

    private final ActivityRepository activityRepository;

    private final ActivityMapper activityMapper;

    @Override
    public ApiResponse<List<ActivityResponse>> getRecentActivity() {

        User currentUser = authenticationFacade.getCurrentUser();

        List<ActivityResponse> response = activityRepository
                .findTop10ByUserOrderByCreatedAtDesc(currentUser)
                .stream()
                .map(activityMapper::toResponse)
                .collect(Collectors.toList());

        return ApiResponse.success(
                response,
                "Recent activity fetched successfully.");

    }

    @Override
    public void logActivity(
            User user,
            ActivityType type,
            String title,
            String description) {

        Activity activity = Activity.builder()
                .user(user)
                .type(type)
                .title(title)
                .description(description)
                .build();

        activityRepository.save(activity);

    }
    
}