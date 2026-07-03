package com.orivex.ai.strategy;

import com.orivex.project.entity.Project;
import com.orivex.user.entity.FreelancerProfile;

public interface MatchingStrategy {

    /**
     * Calculates a score between 0 and 100
     */
    double calculateScore(Project project, FreelancerProfile freelancerProfile);

    /**
     * Name of the strategy
     */
    String getStrategyName();

}