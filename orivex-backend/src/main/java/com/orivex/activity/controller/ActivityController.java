package com.orivex.activity.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orivex.activity.dto.ActivityResponse;
import com.orivex.activity.service.ActivityService;
import com.orivex.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/activity")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @GetMapping("/recent")
    public ApiResponse<List<ActivityResponse>> getRecentActivity() {

        return activityService.getRecentActivity();

    }

}