package com.orivex.ai.engine;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.springframework.stereotype.Component;

import com.orivex.ai.dto.AiScore;
import com.orivex.ai.strategy.AvailabilityMatchingStrategy;
import com.orivex.ai.strategy.ExperienceMatchingStrategy;
import com.orivex.ai.strategy.SkillMatchingStrategy;
import com.orivex.project.entity.Project;
import com.orivex.user.entity.FreelancerProfile;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AiMatchingEngine {

    private final SkillMatchingStrategy skillStrategy;
    private final ExperienceMatchingStrategy experienceStrategy;
    private final AvailabilityMatchingStrategy availabilityStrategy;

    public AiScore calculateScore(
            Project project,
            FreelancerProfile freelancer) {

        double skillScore = skillStrategy.calculateScore(project, freelancer);

        double experienceScore = experienceStrategy.calculateScore(project, freelancer);

        double availabilityScore = availabilityStrategy.calculateScore(project, freelancer);

        double overallScore = (skillScore * 0.40)
                + (experienceScore * 0.40)
                + (availabilityScore * 0.20);

        return AiScore.builder()
                .skillScore(round(skillScore))
                .experienceScore(round(experienceScore))
                .availabilityScore(round(availabilityScore))
                .overallScore(round(overallScore))
                .build();
    }

    private double round(double value) {
        return BigDecimal.valueOf(value)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}