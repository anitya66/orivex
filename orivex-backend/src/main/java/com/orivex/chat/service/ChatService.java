package com.orivex.chat.service;

import java.util.List;

import com.orivex.chat.dto.ChatMessageRequest;
import com.orivex.chat.dto.ChatMessageResponse;

public interface ChatService {

    ChatMessageResponse sendMessage(
            ChatMessageRequest request);

    List<ChatMessageResponse> getMessages(
            Long conversationId);

}