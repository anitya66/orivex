package com.orivex.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import java.util.List;


import com.orivex.user.entity.User;
import com.orivex.user.enums.UserRole;

public interface UserRepository
        extends JpaRepository<User, Long>,
        JpaSpecificationExecutor<User> {

    Optional<User> findByEmail(String email);

    long countByRole(UserRole role);


    @Query("""

SELECT
MONTH(u.createdAt),
COUNT(u)

FROM User u

GROUP BY MONTH(u.createdAt)

ORDER BY MONTH(u.createdAt)

""")
List<Object[]> getMonthlyUserGrowth();


List<User> findTop5ByOrderByCreatedAtDesc();



}

