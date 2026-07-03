package com.orivex.notification.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.orivex.common.response.ApiResponse;
import com.orivex.notification.dto.NotificationResponse;
import com.orivex.notification.service.NotificationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@Tag(name = "Notification", description = "Notification Management APIs")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @Operation(summary = "Get current user's notifications")
    public ApiResponse<List<NotificationResponse>> getMyNotifications() {

        return notificationService.getMyNotifications();

    }

    @GetMapping("/unread-count")
    @Operation(summary = "Get unread notification count")
    public ApiResponse<Long> getUnreadCount() {

        return notificationService.getUnreadCount();

    }

    @PutMapping("/{notificationId}/read")
    @Operation(summary = "Mark notification as read")
    public ApiResponse<String> markAsRead(
            @PathVariable Long notificationId) {

        return notificationService.markAsRead(notificationId);

    }

    @PutMapping("/read-all")
    @Operation(summary = "Mark all notifications as read")
    public ApiResponse<String> markAllAsRead() {

        return notificationService.markAllAsRead();

    }

}