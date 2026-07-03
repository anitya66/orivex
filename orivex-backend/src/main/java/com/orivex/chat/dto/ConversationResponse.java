package com.orivex.chat.dto;

import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversationResponse {

    private Long id;

    private Long projectId;

    private String projectTitle;

    private Long otherUserId;

    private String otherUserName;

    private String lastMessage;

    private LocalDateTime lastMessageAt;

}