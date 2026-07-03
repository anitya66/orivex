package com.orivex.chat.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.orivex.chat.dto.ChatMessageResponse;
import com.orivex.chat.entity.ChatMessage;

@Mapper(componentModel = "spring")
public interface ChatMessageMapper {

    @Mapping(target = "conversationId", source = "conversation.id")
    @Mapping(target = "senderId", source = "sender.id")
    @Mapping(target = "senderName", source = "sender.name")
    ChatMessageResponse toResponse(ChatMessage message);

}