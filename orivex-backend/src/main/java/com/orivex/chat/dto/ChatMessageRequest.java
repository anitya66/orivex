package com.orivex.chat.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageRequest {

    @NotNull
    private Long conversationId;

    @NotBlank
    private String message;

}