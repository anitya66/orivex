package com.orivex.contract.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orivex.contract.entity.Contract;
import com.orivex.contract.enums.ContractStatus;
import com.orivex.proposal.entity.Proposal;
import com.orivex.user.entity.ClientProfile;
import com.orivex.user.entity.FreelancerProfile;

public interface ContractRepository
                extends JpaRepository<Contract, Long> {

        List<Contract> findByFreelancer(
                        FreelancerProfile freelancer);

        List<Contract> findByClient(
                        ClientProfile client);

        boolean existsByProposal(
                        Proposal proposal);

        long countByFreelancer(
                        FreelancerProfile freelancer);

        long countByClient(
                        ClientProfile client);

        long countByClientAndStatus(
        ClientProfile client,
        ContractStatus status);

        long countByFreelancerAndStatus(
        FreelancerProfile freelancer,
                        ContractStatus status);
        
        long countByStatus(
                        ContractStatus status);

        List<Contract> findTop5ByOrderByCreatedAtDesc();                             

}