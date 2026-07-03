package com.orivex.chat.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.orivex.chat.dto.ChatMessageRequest;
import com.orivex.chat.dto.ChatMessageResponse;
import com.orivex.chat.entity.ChatMessage;
import com.orivex.chat.entity.Conversation;
import com.orivex.chat.enums.MessageStatus;
import com.orivex.chat.mapper.ChatMessageMapper;
import com.orivex.chat.repository.ChatMessageRepository;
import com.orivex.chat.repository.ConversationRepository;
import com.orivex.common.exception.BadRequestException;
import com.orivex.security.AuthenticationFacade;
import com.orivex.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl
        implements ChatService {

    private final ChatMessageRepository chatMessageRepository;

    private final ConversationRepository conversationRepository;

    private final ChatMessageMapper chatMessageMapper;

    private final AuthenticationFacade authenticationFacade;

    @Override
    public ChatMessageResponse sendMessage(
            ChatMessageRequest request) {

        User sender = authenticationFacade.getCurrentUser();

        Conversation conversation =
                conversationRepository.findById(
                        request.getConversationId())
                        .orElseThrow(() ->
                                new BadRequestException(
                                        "Conversation not found."));
        
        boolean isClient = conversation.getClient()
                .getUser()
                .getId()
                .equals(sender.getId());

        boolean isFreelancer = conversation.getFreelancer()
                .getUser()
                .getId()
                .equals(sender.getId());

        if (!isClient && !isFreelancer) {

            throw new BadRequestException(
                    "You are not authorized to send messages in this conversation.");

        }

        ChatMessage chatMessage = ChatMessage.builder()
                .conversation(conversation)
                .sender(sender)
                .message(request.getMessage())
                .status(MessageStatus.SENT)
                .build();

        ChatMessage savedMessage = chatMessageRepository.save(chatMessage);

        conversation.setLastMessage(savedMessage.getMessage());

        conversation.setLastMessageAt(LocalDateTime.now());

        conversationRepository.save(conversation);

        return chatMessageMapper.toResponse(savedMessage);

    }

    @Override
    public List<ChatMessageResponse> getMessages(
            Long conversationId) {

        User currentUser = authenticationFacade.getCurrentUser();

        Conversation conversation = conversationRepository
                .findById(conversationId)
                .orElseThrow(() -> new BadRequestException(
                        "Conversation not found."));

        boolean isClient = conversation.getClient()
                .getUser()
                .getId()
                .equals(currentUser.getId());

        boolean isFreelancer = conversation.getFreelancer()
                .getUser()
                .getId()
                .equals(currentUser.getId());

        if (!isClient && !isFreelancer) {

            throw new BadRequestException(
                    "You are not authorized to view this conversation.");

        }

        return chatMessageRepository
                .findByConversationOrderByCreatedAtAsc(conversation)
                .stream()
                .map(chatMessageMapper::toResponse)
                .toList();

    }

}                                