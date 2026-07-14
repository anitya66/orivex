package com.orivex.chat.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.orivex.chat.dto.ConversationResponse;
import com.orivex.chat.entity.Conversation;
import com.orivex.chat.mapper.ConversationMapper;
import com.orivex.chat.repository.ConversationRepository;
import com.orivex.common.exception.BadRequestException;
import com.orivex.contract.entity.Contract;
import com.orivex.security.AuthenticationFacade;
import com.orivex.user.entity.ClientProfile;
import com.orivex.user.entity.FreelancerProfile;
import com.orivex.user.entity.User;
import com.orivex.user.repository.ClientProfileRepository;
import com.orivex.user.repository.FreelancerProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConversationServiceImpl
        implements ConversationService {

    private final ConversationRepository conversationRepository;

    private final ConversationMapper conversationMapper;

    private final AuthenticationFacade authenticationFacade;

    private final ClientProfileRepository clientProfileRepository;

    private final FreelancerProfileRepository freelancerProfileRepository;

    @Override
    public Conversation createConversation(
            Contract contract) {

        return conversationRepository
                .findByProject(contract.getProject())
                .orElseGet(() -> {

                    Conversation conversation = Conversation.builder()
                            .project(contract.getProject())
                            .client(contract.getClient())
                            .freelancer(contract.getFreelancer())
                            .lastMessage(null)
                            .lastMessageAt(LocalDateTime.now())
                            .build();

                    return conversationRepository.save(conversation);

                });

    }

    @Override
    public List<ConversationResponse> getMyConversations() {

            User currentUser = authenticationFacade.getCurrentUser();

            try {

                    ClientProfile client = clientProfileRepository
                                    .findByUser(currentUser)
                                    .orElseThrow();

                    return conversationRepository
                                    .findByClientOrderByLastMessageAtDesc(client)
                                    .stream()
                                    .map(conversation -> {

                                            ConversationResponse response = conversationMapper.toResponse(conversation);

                                            response.setOtherUserId(
                                                            conversation.getFreelancer()
                                                                            .getUser()
                                                                            .getId());

                                            response.setOtherUserName(
                                                            conversation.getFreelancer()
                                                                            .getUser()
                                                                            .getName());

                                            return response;

                                    })
                                    .toList();

            } catch (Exception ignored) {
                    FreelancerProfile freelancer = freelancerProfileRepository
                                    .findByUser(currentUser)
                                    .orElseThrow(() -> new BadRequestException(
                                                    "Freelancer profile not found."));

                    return conversationRepository
                                    .findByFreelancerOrderByLastMessageAtDesc(freelancer)
                                    .stream()
                                    .map(conversation -> {

                                            ConversationResponse response = conversationMapper.toResponse(conversation);

                                            response.setOtherUserId(
                                                            conversation.getClient()
                                                                            .getUser()
                                                                            .getId());

                                            response.setOtherUserName(
                                                            conversation.getClient()
                                                                            .getUser()
                                                                            .getName());

                                            return response;

                                    })
                                    .toList();

            }

    }

    @Override
    public Long getConversationIdByFreelancer(Long freelancerId) {

            User currentUser = authenticationFacade.getCurrentUser();

            ClientProfile client = clientProfileRepository
                            .findByUser(currentUser)
                            .orElseThrow(() -> new BadRequestException(
                                            "Client profile not found."));

            FreelancerProfile freelancer = freelancerProfileRepository
                            .findById(freelancerId)
                            .orElseThrow(() -> new BadRequestException(
                                            "Freelancer not found."));

            Conversation conversation = conversationRepository
                            .findByClientAndFreelancer(client, freelancer)
                            .orElseThrow(() -> new BadRequestException(
                                            "Conversation not found."));

            return conversation.getId();
    }

    

}
