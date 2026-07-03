package com.orivex.ai.service;

import java.util.List;

import com.orivex.ai.dto.AiMatchResponse;
import com.orivex.common.response.ApiResponse;

public interface AiService {

    ApiResponse<List<AiMatchResponse>> getBestMatches(
            Long projectId);

}