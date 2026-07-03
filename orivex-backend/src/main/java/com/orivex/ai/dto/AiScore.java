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
public class AiScore {

    private Double overallScore;

    private Double skillScore;

    private Double experienceScore;

    private Double availabilityScore;

}