package com.orivex.activity.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ActivityResponse {

    private String title;

    private String description;

    private String type;

    private String time;

}