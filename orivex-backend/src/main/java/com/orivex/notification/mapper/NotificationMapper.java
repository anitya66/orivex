package com.orivex.notification.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.orivex.notification.dto.NotificationResponse;
import com.orivex.notification.entity.Notification;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    @Mapping(target = "id", source = "id")
    NotificationResponse toResponse(Notification notification);

}