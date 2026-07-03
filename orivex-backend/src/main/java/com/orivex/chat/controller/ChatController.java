package com.orivex.chat.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import com.orivex.chat.dto.ChatMessageRequest;
import com.orivex.chat.dto.ChatMessageResponse;
import com.orivex.chat.service.ChatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.send")
    public void sendMessage(
            ChatMessageRequest request,
            Principal principal) {

        ChatMessageResponse response = chatService.sendMessage(request);

        messagingTemplate.convertAndSend(
                "/topic/conversations/" + response.getConversationId(),
                response);

    }

    @GetMapping("/{conversationId}")
    public List<ChatMessageResponse> getMessages(
            @PathVariable Long conversationId) {

        return chatService.getMessages(conversationId);

    }

}