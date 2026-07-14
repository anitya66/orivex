package com.orivex.project.specification;

import org.springframework.data.jpa.domain.Specification;

import com.orivex.project.entity.Project;
import com.orivex.project.enums.ProjectStatus;

public class ProjectSpecification {

        private ProjectSpecification() {
        }

        public static Specification<Project> hasStatus(ProjectStatus status) {

                return (root, query, cb) -> cb.equal(root.get("status"), status);
        }

        public static Specification<Project> isNotDeleted() {

                return (root, query, cb) -> cb.notEqual(root.get("status"), ProjectStatus.DELETED);
        }

        public static Specification<Project> isOpen() {

                return (root, query, cb) -> cb.equal(root.get("status"), ProjectStatus.OPEN);
        }

        public static Specification<Project> titleContains(String keyword) {

                return (root, query, cb) -> cb.like(
                                cb.lower(root.get("title")),
                                "%" + keyword.toLowerCase() + "%");
        }

        public static Specification<Project> hasMinimumBudget(Double minBudget) {

                return (root, query, cb) -> cb.greaterThanOrEqualTo(
                                root.get("budget"),
                                minBudget);
        }

}