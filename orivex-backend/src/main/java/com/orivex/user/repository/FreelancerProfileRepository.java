package com.orivex.user.repository;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.orivex.user.entity.FreelancerProfile;
import com.orivex.user.entity.User;

public interface FreelancerProfileRepository extends JpaRepository<FreelancerProfile, Long> {

    Optional<FreelancerProfile> findByUser(User user);

    List<FreelancerProfile> findByAvailableTrue();

    boolean existsByUser(User user);

}