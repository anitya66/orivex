package com.orivex.ai.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.orivex.ai.dto.AiMatchResponse;
import com.orivex.ai.dto.AiScore;
import com.orivex.ai.engine.AiMatchingEngine;
import com.orivex.ai.mapper.AiMapper;
import com.orivex.common.exception.BadRequestException;
import com.orivex.common.response.ApiResponse;
import com.orivex.project.entity.Project;
import com.orivex.project.repository.ProjectRepository;
import com.orivex.review.repository.ReviewRepository;
import com.orivex.user.entity.FreelancerProfile;
import com.orivex.user.repository.FreelancerProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    private final ProjectRepository projectRepository;

    private final FreelancerProfileRepository freelancerProfileRepository;

    private final ReviewRepository reviewRepository;

    private final AiMatchingEngine aiMatchingEngine;

    private final AiMapper aiMapper;

    @Override
    public ApiResponse<List<AiMatchResponse>> getBestMatches(
            Long projectId) {

        Project project = projectRepository
                .findById(projectId)
                .orElseThrow(() -> new BadRequestException(
                        "Project not found."));

        List<FreelancerProfile> freelancers = freelancerProfileRepository.findByAvailableTrue();

        List<AiMatchResponse> response = freelancers.stream()

                .map(freelancer -> {

                    AiScore score = aiMatchingEngine.calculateScore(
                            project,
                            freelancer);

                    Double rating = reviewRepository.findAverageRatingByReviewee(
                            freelancer.getUser());

                    return aiMapper.toResponse(
                            freelancer,
                            score,
                            rating);

                })

                .sorted(
                        Comparator.comparing(
                                AiMatchResponse::getOverallScore)
                                .reversed())

                .toList();

        return ApiResponse.success(
                response,
                "AI matches generated successfully.");

    }

}