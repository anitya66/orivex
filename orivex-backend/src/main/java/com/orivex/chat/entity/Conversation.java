package com.orivex.chat.entity;

import java.time.LocalDateTime;

import com.orivex.common.entity.BaseEntity;
import com.orivex.project.entity.Project;
import com.orivex.user.entity.ClientProfile;
import com.orivex.user.entity.FreelancerProfile;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "conversations", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "project_id" })
})
public class Conversation extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_profile_id", nullable = false)
    private ClientProfile client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "freelancer_profile_id", nullable = false)
    private FreelancerProfile freelancer;

    @Column(length = 2000)
    private String lastMessage;

    private LocalDateTime lastMessageAt;

}