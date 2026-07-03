package com.orivex.ai.strategy;

import org.springframework.stereotype.Component;

import com.orivex.project.entity.Project;
import com.orivex.user.entity.FreelancerProfile;

@Component
public class ExperienceMatchingStrategy implements MatchingStrategy {

    @Override
    public double calculateScore(Project project, FreelancerProfile freelancerProfile) {

        Integer requiredExperience = project.getMinimumExperienceYears();
        Integer freelancerExperience = freelancerProfile.getExperienceYears();

        if (requiredExperience == null || freelancerExperience == null) {
            return 0;
        }

        // Freelancer meets or exceeds the requirement
        if (freelancerExperience >= requiredExperience) {
            return 100;
        }

        // Partial score if experience is lower
        return (freelancerExperience * 100.0) / requiredExperience;
    }

    @Override
    public String getStrategyName() {
        return "Experience Matching";
    }
}