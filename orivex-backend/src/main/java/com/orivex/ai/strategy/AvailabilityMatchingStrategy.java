package com.orivex.ai.strategy;

import org.springframework.stereotype.Component;

import com.orivex.project.entity.Project;
import com.orivex.user.entity.FreelancerProfile;

@Component
public class AvailabilityMatchingStrategy implements MatchingStrategy {

    @Override
    public double calculateScore(Project project, FreelancerProfile freelancerProfile) {

        Boolean available = freelancerProfile.getAvailable();

        if (available == null) {
            return 0;
        }

        return available ? 100 : 0;
    }

    @Override
    public String getStrategyName() {
        return "Availability Matching";
    }

}