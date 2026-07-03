package com.orivex.chat.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.orivex.chat.dto.ConversationResponse;
import com.orivex.chat.entity.Conversation;

@Mapper(componentModel = "spring")
public interface ConversationMapper {

    @Mapping(target = "projectId", source = "project.id")

    @Mapping(target = "projectTitle", source = "project.title")

    @Mapping(target = "otherUserId", ignore = true)

    @Mapping(target = "otherUserName", ignore = true)

    ConversationResponse toResponse(
            Conversation conversation);

}