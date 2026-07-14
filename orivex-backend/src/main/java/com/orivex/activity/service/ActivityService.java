package com.orivex.activity.service;

import java.util.List;

import com.orivex.activity.dto.ActivityResponse;
import com.orivex.activity.enums.ActivityType;
import com.orivex.common.response.ApiResponse;
import com.orivex.user.entity.User;

public interface ActivityService {

    ApiResponse<List<ActivityResponse>> getRecentActivity();

    void logActivity(
            User user,
            ActivityType type,
            String title,
            String description);

}