package com.orivex.notification.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orivex.notification.entity.Notification;
import com.orivex.notification.enums.NotificationStatus;
import com.orivex.user.entity.User;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    List<Notification> findByUserOrderByCreatedAtDesc(
            User user);

    List<Notification> findByUserAndStatusOrderByCreatedAtDesc(
            User user,
            NotificationStatus status);

    long countByUserAndStatus(
            User user,
            NotificationStatus status);

}