package com.orivex.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiMatchResponse {

    private Long freelancerId;

    private String freelancerName;

    private String headline;

    private String skills;

    private Double hourlyRate;

    private Integer experienceYears;

    private String profileImage;

    private Double overallScore;

    private Double skillScore;

    private Double experienceScore;

    private Double availabilityScore;

    private Double ratingScore;

    private String recommendation;

}