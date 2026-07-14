package com.orivex.activity.mapper;

import org.springframework.stereotype.Component;

import com.orivex.activity.dto.ActivityResponse;
import com.orivex.activity.entity.Activity;

@Component
public class ActivityMapper {

    public ActivityResponse toResponse(Activity activity) {

        return ActivityResponse.builder()
                .title(activity.getTitle())
                .description(activity.getDescription())
                .type(activity.getType().name())
                .time(activity.getCreatedAt().toString())
                .build();

    }

}