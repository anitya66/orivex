package com.orivex.notification.dto;

import com.orivex.notification.enums.NotificationType;

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
public class CreateNotificationRequest {

    private Long userId;

    private NotificationType type;

    private String title;

    private String message;

}