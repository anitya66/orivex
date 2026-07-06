package com.orivex.proposal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orivex.project.entity.Project;
import com.orivex.proposal.entity.Proposal;
import com.orivex.proposal.enums.ProposalStatus;
import com.orivex.user.entity.FreelancerProfile;

public interface ProposalRepository
        extends JpaRepository<Proposal, Long> {

    List<Proposal> findByFreelancer(
            FreelancerProfile freelancer);

    List<Proposal> findByProject(
            Project project);

    boolean existsByProjectAndFreelancer(
            Project project,
            FreelancerProfile freelancer);

    long countByProject(
            Project project);

    long countByProjectAndStatus(
            Project project,
            ProposalStatus status);

    List<Proposal> findByProjectAndStatus(
            Project project,
            ProposalStatus status);        
}