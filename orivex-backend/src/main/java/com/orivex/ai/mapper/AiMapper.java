package com.orivex.ai.mapper;

import org.springframework.stereotype.Component;

import com.orivex.ai.dto.AiMatchResponse;
import com.orivex.ai.dto.AiScore;
import com.orivex.user.entity.FreelancerProfile;

@Component
public class AiMapper {

    public AiMatchResponse toResponse(
            FreelancerProfile freelancer,
            AiScore score,
            Double averageRating) {

        return AiMatchResponse.builder()

                .freelancerId(freelancer.getId())

                .freelancerName(freelancer.getUser().getName())

                .overallScore(score.getOverallScore())

                .skillScore(score.getSkillScore())

                .experienceScore(score.getExperienceScore())

                .availabilityScore(score.getAvailabilityScore())

                .ratingScore(averageRating == null ? 0.0 : averageRating)

                .recommendation(getRecommendation(score.getOverallScore()))

                .build();
    }

    private String getRecommendation(Double score) {

        if (score >= 90)
            return "Excellent Match";

        if (score >= 75)
            return "Highly Recommended";

        if (score >= 60)
            return "Recommended";

        if (score >= 40)
            return "Average Match";

        return "Low Match";
    }

}