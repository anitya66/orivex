package com.orivex.notification.service;

import java.util.List;

import com.orivex.common.response.ApiResponse;
import com.orivex.notification.dto.NotificationResponse;

public interface NotificationService {

    ApiResponse<List<NotificationResponse>> getMyNotifications();

    ApiResponse<Long> getUnreadCount();

    ApiResponse<String> markAsRead(
            Long notificationId);

    ApiResponse<String> markAllAsRead();

}