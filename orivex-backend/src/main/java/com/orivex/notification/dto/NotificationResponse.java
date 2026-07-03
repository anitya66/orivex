package com.orivex.notification.dto;

import java.time.LocalDateTime;

import com.orivex.notification.enums.NotificationStatus;
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
public class NotificationResponse {

    private Long id;

    private NotificationType type;

    private String title;

    private String message;

    private NotificationStatus status;

    private LocalDateTime createdAt;

}