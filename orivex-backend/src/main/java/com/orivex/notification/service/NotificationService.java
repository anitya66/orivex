package com.orivex.notification.service;

import java.util.List;

import com.orivex.common.response.ApiResponse;
import com.orivex.notification.dto.NotificationResponse;
import com.orivex.notification.enums.NotificationType;
import com.orivex.user.entity.User;

public interface NotificationService {

    ApiResponse<List<NotificationResponse>> getMyNotifications();

    ApiResponse<Long> getUnreadCount();

    ApiResponse<String> markAsRead(
            Long notificationId);

    ApiResponse<String> markAllAsRead();

    void createNotification(
            User user,
            NotificationType type,
            String title,
            String message);

}