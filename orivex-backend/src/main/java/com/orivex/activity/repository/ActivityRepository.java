package com.orivex.activity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orivex.activity.entity.Activity;
import com.orivex.user.entity.User;

public interface ActivityRepository
        extends JpaRepository<Activity, Long> {

    List<Activity> findTop10ByUserOrderByCreatedAtDesc(
            User user);

}