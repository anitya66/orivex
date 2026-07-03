package com.orivex.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orivex.user.entity.User;
import com.orivex.user.enums.UserRole;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    long countByRole(UserRole role);

}