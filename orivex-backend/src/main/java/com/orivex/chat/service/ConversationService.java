package com.orivex.chat.service;

import java.util.List;

import com.orivex.chat.dto.ConversationResponse;
import com.orivex.chat.entity.Conversation;
import com.orivex.contract.entity.Contract;

public interface ConversationService {

    Conversation createConversation(
            Contract contract);

    List<ConversationResponse> getMyConversations();

    

}