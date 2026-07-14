package com.orivex.review.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.orivex.activity.enums.ActivityType;
import com.orivex.activity.service.ActivityService;
import com.orivex.common.exception.BadRequestException;
import com.orivex.common.response.ApiResponse;
import com.orivex.contract.entity.Contract;
import com.orivex.contract.enums.ContractStatus;
import com.orivex.contract.repository.ContractRepository;
import com.orivex.notification.enums.NotificationType;
import com.orivex.notification.helper.NotificationHelper;
import com.orivex.review.dto.CreateReviewRequest;
import com.orivex.review.dto.ReviewResponse;
import com.orivex.review.dto.ReviewStatusResponse;
import com.orivex.review.dto.ReviewSummaryResponse;
import com.orivex.review.entity.Review;
import com.orivex.review.mapper.ReviewMapper;
import com.orivex.review.repository.ReviewRepository;
import com.orivex.security.AuthenticationFacade;
import com.orivex.user.entity.ClientProfile;
import com.orivex.user.entity.FreelancerProfile;
import com.orivex.user.entity.User;
import com.orivex.user.repository.ClientProfileRepository;
import com.orivex.user.repository.FreelancerProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

        private final ReviewRepository reviewRepository;

        private final ContractRepository contractRepository;

        private final AuthenticationFacade authenticationFacade;

        private final ReviewMapper reviewMapper;

        private final FreelancerProfileRepository freelancerProfileRepository;

        private final ClientProfileRepository clientProfileRepository;

        private final NotificationHelper notificationHelper;

        private final ActivityService activityService;

        @Override
        public ApiResponse<ReviewResponse> createReview(
                        CreateReviewRequest request) {

                User currentUser = authenticationFacade.getCurrentUser();

                Contract contract = contractRepository
                                .findById(request.getContractId())
                                .orElseThrow(() -> new BadRequestException(
                                                "Contract not found."));

                if (contract.getStatus() != ContractStatus.COMPLETED) {

                        throw new BadRequestException(
                                        "Cannot review before contract completion.");
                }

                if (!contract.getClient().getUser().getId().equals(currentUser.getId())
                                && !contract.getFreelancer().getUser().getId().equals(currentUser.getId())) {

                        throw new BadRequestException(
                                        "You are not authorized to review this contract.");
                }

                if (reviewRepository.existsByContractAndReviewer(
                                contract,
                                currentUser)) {

                        throw new BadRequestException(
                                        "You have already reviewed this contract.");
                }

                User reviewee;

                if (contract.getClient().getUser().getId().equals(currentUser.getId())) {

                        reviewee = contract.getFreelancer().getUser();

                } else {

                        reviewee = contract.getClient().getUser();

                }

                Review review = Review.builder()
                                .contract(contract)
                                .reviewer(currentUser)
                                .reviewee(reviewee)
                                .rating(request.getRating())
                                .comment(request.getComment())
                                .build();

                review = reviewRepository.save(review);

                notificationHelper.createNotification(
                                reviewee,
                                NotificationType.REVIEW,
                                "New Review Received",
                                currentUser.getName()
                                                + " has given you a "
                                                + request.getRating()
                                                + "-star review.");

                activityService.logActivity(
                                currentUser,
                                ActivityType.REVIEW,
                                "Review Submitted",
                                "You gave a "
                                                + request.getRating()
                                                + "★ review for project \""
                                                + contract.getProject().getTitle()
                                                + "\".");

                activityService.logActivity(
                                reviewee,
                                ActivityType.REVIEW,
                                "Review Received",
                                "You received a "
                                                + request.getRating()
                                                + "★ review for project \""
                                                + contract.getProject().getTitle()
                                                + "\".");

                return ApiResponse.success(
                                reviewMapper.toResponse(review),
                                "Review created successfully.");
        }

        @Override
        public ApiResponse<List<ReviewResponse>> getReviewsForFreelancer(
                        Long freelancerId) {

                FreelancerProfile freelancer = freelancerProfileRepository
                                .findById(freelancerId)
                                .orElseThrow(() -> new BadRequestException(
                                                "Freelancer not found."));

                List<ReviewResponse> response = reviewRepository
                                .findByReviewee(freelancer.getUser())
                                .stream()
                                .map(reviewMapper::toResponse)
                                .collect(Collectors.toList());

                return ApiResponse.success(
                                response,
                                "Reviews fetched successfully.");

        }

        @Override
        public ApiResponse<List<ReviewResponse>> getReviewsForClient(
                        Long clientId) {

                ClientProfile client = clientProfileRepository
                                .findById(clientId)
                                .orElseThrow(() -> new BadRequestException(
                                                "Client not found."));

                List<ReviewResponse> response = reviewRepository
                                .findByReviewee(client.getUser())
                                .stream()
                                .map(reviewMapper::toResponse)
                                .collect(Collectors.toList());

                return ApiResponse.success(
                                response,
                                "Reviews fetched successfully.");

        }

        @Override
        public ApiResponse<Double> getFreelancerAverageRating(
                        Long freelancerId) {

                FreelancerProfile freelancer = freelancerProfileRepository
                                .findById(freelancerId)
                                .orElseThrow(() -> new BadRequestException(
                                                "Freelancer not found."));

                Double average = reviewRepository.findAverageRatingByReviewee(
                                freelancer.getUser());

                if (average == null) {
                        average = 0.0;
                }

                return ApiResponse.success(
                                average,
                                "Average rating fetched successfully.");

        }

        @Override
        public ApiResponse<ReviewSummaryResponse> getFreelancerReviewSummary(
                        Long freelancerId) {

                FreelancerProfile freelancer = freelancerProfileRepository
                                .findById(freelancerId)
                                .orElseThrow(() -> new BadRequestException(
                                                "Freelancer not found."));

                Double averageRating = reviewRepository.findAverageRatingByReviewee(
                                freelancer.getUser());

                if (averageRating == null) {
                        averageRating = 0.0;
                }

                long reviewCount = reviewRepository.countByReviewee(
                                freelancer.getUser());

                ReviewSummaryResponse response = ReviewSummaryResponse.builder()
                                .averageRating(averageRating)
                                .reviewCount(reviewCount)
                                .build();

                return ApiResponse.success(
                                response,
                                "Review summary fetched successfully.");
        }

        @Override
public ApiResponse<ReviewStatusResponse> getReviewStatus(
        Long contractId) {

    User currentUser = authenticationFacade.getCurrentUser();

    Contract contract = contractRepository
            .findById(contractId)
            .orElseThrow(() -> new BadRequestException(
                    "Contract not found."));

    boolean alreadyReviewed =
            reviewRepository.existsByContractAndReviewer(
                    contract,
                    currentUser);

    return ApiResponse.success(
            new ReviewStatusResponse(alreadyReviewed),
            "Review status fetched successfully.");
}

}