package com.orivex.notification.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.orivex.common.exception.BadRequestException;
import com.orivex.common.response.ApiResponse;
import com.orivex.notification.dto.NotificationResponse;
import com.orivex.notification.entity.Notification;
import com.orivex.notification.enums.NotificationStatus;
import com.orivex.notification.mapper.NotificationMapper;
import com.orivex.notification.repository.NotificationRepository;
import com.orivex.security.AuthenticationFacade;
import com.orivex.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    private final NotificationMapper notificationMapper;

    private final AuthenticationFacade authenticationFacade;

    @Override
    public ApiResponse<List<NotificationResponse>> getMyNotifications() {

        User currentUser = authenticationFacade.getCurrentUser();

        List<NotificationResponse> response = notificationRepository
                .findByUserOrderByCreatedAtDesc(currentUser)
                .stream()
                .map(notificationMapper::toResponse)
                .toList();

        return ApiResponse.success(
                response,
                "Notifications fetched successfully.");

    }

    @Override
    public ApiResponse<Long> getUnreadCount() {

        User currentUser = authenticationFacade.getCurrentUser();

        long unreadCount = notificationRepository
                .countByUserAndStatus(
                        currentUser,
                        NotificationStatus.UNREAD);

        return ApiResponse.success(
                unreadCount,
                "Unread notification count fetched successfully.");

    }

    @Override
    public ApiResponse<String> markAsRead(
            Long notificationId) {

        User currentUser = authenticationFacade.getCurrentUser();

        Notification notification = notificationRepository
                .findById(notificationId)
                .orElseThrow(() -> new BadRequestException(
                        "Notification not found."));

        if (!notification.getUser().getId().equals(currentUser.getId())) {

            throw new BadRequestException(
                    "You are not allowed to access this notification.");

        }

        notification.setStatus(NotificationStatus.READ);

        notificationRepository.save(notification);

        return ApiResponse.success(
                "Notification marked as read.");

    }

    @Override
    public ApiResponse<String> markAllAsRead() {

        User currentUser = authenticationFacade.getCurrentUser();

        List<Notification> notifications = notificationRepository
                .findByUserAndStatusOrderByCreatedAtDesc(
                        currentUser,
                        NotificationStatus.UNREAD);

        notifications.forEach(notification -> notification.setStatus(NotificationStatus.READ));

        notificationRepository.saveAll(notifications);

        return ApiResponse.success(
                "All notifications marked as read.");

    }

}