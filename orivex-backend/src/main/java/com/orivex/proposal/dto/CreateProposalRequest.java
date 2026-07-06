package com.orivex.proposal.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateProposalRequest {

    @NotNull(message = "Project id is required.")
    private Long projectId;

    @NotBlank(message = "Cover letter is required.")
    @Size(max = 5000, message = "Cover letter cannot exceed 5000 characters.")
    private String coverLetter;

    @NotNull(message = "Proposed budget is required.")
    @DecimalMin(value = "1.0", message = "Budget must be greater than zero.")
    private BigDecimal proposedBudget;

    @NotNull(message = "Estimated days is required.")
    @Min(value = 1, message = "Estimated days must be at least 1.")
    private Integer estimatedDays;

}