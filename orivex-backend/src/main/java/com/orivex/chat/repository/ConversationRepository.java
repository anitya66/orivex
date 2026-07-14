package com.orivex.chat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orivex.chat.entity.Conversation;
import com.orivex.project.entity.Project;
import com.orivex.user.entity.ClientProfile;
import com.orivex.user.entity.FreelancerProfile;

public interface ConversationRepository
                extends JpaRepository<Conversation, Long> {

        Optional<Conversation> findByProject(Project project);

        List<Conversation> findByClientOrderByLastMessageAtDesc(
                        ClientProfile client);

        List<Conversation> findByFreelancerOrderByLastMessageAtDesc(
                        FreelancerProfile freelancer);

        // ================= NEW =================

        Optional<Conversation> findByClientAndFreelancer(
                        ClientProfile client,
                        FreelancerProfile freelancer);

}