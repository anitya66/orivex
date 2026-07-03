package com.orivex.ai.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orivex.ai.dto.AiMatchResponse;
import com.orivex.ai.service.AiService;
import com.orivex.common.response.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
@Tag(name = "AI Matching", description = "AI Powered Freelancer Matching APIs")
public class AiController {

    private final AiService aiService;

    @GetMapping("/projects/{projectId}/matches")
    @Operation(summary = "Get AI recommended freelancers for a project")
    public ApiResponse<List<AiMatchResponse>> getBestMatches(
            @PathVariable Long projectId) {

        return aiService.getBestMatches(projectId);

    }

}