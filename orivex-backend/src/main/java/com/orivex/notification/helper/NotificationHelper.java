package com.orivex.notification.helper;

import org.springframework.stereotype.Component;

import com.orivex.notification.entity.Notification;
import com.orivex.notification.enums.NotificationStatus;
import com.orivex.notification.enums.NotificationType;
import com.orivex.notification.repository.NotificationRepository;
import com.orivex.user.entity.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NotificationHelper {

    private final NotificationRepository notificationRepository;

    public Notification createNotification(
            User user,
            NotificationType type,
            String title,
            String message) {

        Notification notification = Notification.builder()
                .user(user)
                .type(type)
                .title(title)
                .message(message)
                .status(NotificationStatus.UNREAD)
                .build();

        return notificationRepository.save(notification);
    }

}