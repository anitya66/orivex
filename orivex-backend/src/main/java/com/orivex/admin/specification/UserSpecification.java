package com.orivex.admin.specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.orivex.user.entity.User;
import com.orivex.user.enums.AccountStatus;
import com.orivex.user.enums.UserRole;

import jakarta.persistence.criteria.Predicate;

public class UserSpecification {

    public static Specification<User> filter(
            String keyword,
            UserRole role,
            AccountStatus status) {

        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            // Always hide deleted users
            predicates.add(

                    cb.notEqual(

                            root.get("accountStatus"),

                            AccountStatus.DELETED

                    )

            );

            // Search by name or email
            if (keyword != null && !keyword.isBlank()) {

                String search = "%" + keyword.toLowerCase() + "%";

                predicates.add(

                        cb.or(

                                cb.like(
                                        cb.lower(root.get("name")),
                                        search),

                                cb.like(
                                        cb.lower(root.get("email")),
                                        search)

                        )

                );

            }

            // Filter by role
            if (role != null) {

                predicates.add(

                        cb.equal(
                                root.get("role"),
                                role)

                );

            }

            // Filter by account status
            if (status != null) {

                predicates.add(

                        cb.equal(
                                root.get("accountStatus"),
                                status)

                );

            }

            return cb.and(
                    predicates.toArray(new Predicate[0]));

        };

    }

}