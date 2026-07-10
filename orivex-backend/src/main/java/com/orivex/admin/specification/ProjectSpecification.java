package com.orivex.admin.specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.orivex.project.entity.Project;
import com.orivex.project.enums.ProjectStatus;

import jakarta.persistence.criteria.Predicate;

public class ProjectSpecification {

    public static Specification<Project> filter(

            String keyword,

            ProjectStatus status

    ) {

        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            // Hide deleted projects
            predicates.add(

                    cb.notEqual(

                            root.get("status"),

                            ProjectStatus.DELETED

                    )

            );

            if (keyword != null && !keyword.isBlank()) {

                String search = "%" + keyword.toLowerCase() + "%";

                predicates.add(

                        cb.like(

                                cb.lower(root.get("title")),

                                search

                        )

                );

            }

            if (status != null) {

                predicates.add(

                        cb.equal(

                                root.get("status"),

                                status

                        )

                );

            }

            return cb.and(
                    predicates.toArray(new Predicate[0]));

        };

    }

}