package com.orivex.review.service;

import java.util.List;

import com.orivex.common.response.ApiResponse;
import com.orivex.review.dto.CreateReviewRequest;
import com.orivex.review.dto.ReviewResponse;
import com.orivex.review.dto.ReviewStatusResponse;
import com.orivex.review.dto.ReviewSummaryResponse;

public interface ReviewService {

    ApiResponse<ReviewResponse> createReview(
            CreateReviewRequest request);

    ApiResponse<List<ReviewResponse>> getReviewsForFreelancer(
            Long freelancerId);

    ApiResponse<List<ReviewResponse>> getReviewsForClient(
            Long clientId);

    ApiResponse<Double> getFreelancerAverageRating(Long freelancerId);
    
    ApiResponse<ReviewSummaryResponse> getFreelancerReviewSummary(
                    Long freelancerId);

    ApiResponse<ReviewStatusResponse> getReviewStatus(
        Long contractId);    
}