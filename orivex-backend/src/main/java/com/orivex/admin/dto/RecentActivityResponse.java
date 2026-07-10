package com.orivex.admin.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class RecentActivityResponse {

    private String title;

    private String description;

    private LocalDateTime createdAt;

    private String type;

}