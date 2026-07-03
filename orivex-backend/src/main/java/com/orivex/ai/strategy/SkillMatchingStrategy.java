package com.orivex.ai.strategy;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.orivex.project.entity.Project;
import com.orivex.user.entity.FreelancerProfile;

@Component
public class SkillMatchingStrategy implements MatchingStrategy {

    @Override
    public double calculateScore(Project project, FreelancerProfile freelancerProfile) {

        if (project.getRequiredSkills() == null ||
                freelancerProfile.getSkills() == null) {
            return 0;
        }

        Set<String> requiredSkills = Arrays.stream(project.getRequiredSkills().split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .collect(Collectors.toSet());

        Set<String> freelancerSkills = Arrays.stream(freelancerProfile.getSkills().split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .collect(Collectors.toSet());

        long matchedSkills = requiredSkills.stream()
                .filter(freelancerSkills::contains)
                .count();

        return (matchedSkills * 100.0) / requiredSkills.size();
    }

    @Override
    public String getStrategyName() {
        return "Skill Matching";
    }

}