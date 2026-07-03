package com.orivex.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orivex.chat.entity.ChatMessage;
import com.orivex.chat.entity.Conversation;

public interface ChatMessageRepository
        extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByConversationOrderByCreatedAtAsc(
            Conversation conversation);

}