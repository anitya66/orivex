package com.orivex.chat.dto;

import java.time.LocalDateTime;

import com.orivex.chat.enums.MessageStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageResponse {

    private Long id;

    private Long conversationId;

    private Long senderId;

    private String senderName;

    private String message;

    private MessageStatus status;

    private LocalDateTime createdAt;

}