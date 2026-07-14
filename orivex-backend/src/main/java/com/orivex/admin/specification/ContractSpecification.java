package com.orivex.admin.specification;

import org.springframework.data.jpa.domain.Specification;

import com.orivex.contract.entity.Contract;
import com.orivex.contract.enums.ContractStatus;

public class ContractSpecification {

    public static Specification<Contract> filter(

            String keyword,

            ContractStatus status

    ) {

        return (root, query, cb) -> {

            var predicate = cb.conjunction();

            if (keyword != null && !keyword.isBlank()) {

                String like = "%" + keyword.toLowerCase() + "%";

                predicate = cb.and(

                        predicate,

                        cb.or(

                                cb.like(
                                        cb.lower(root.get("project").get("title")),
                                        like),

                                cb.like(
                                        cb.lower(root.get("client").get("companyName")),
                                        like),

                                cb.like(
                                        cb.lower(root.get("freelancer").get("user").get("name")),
                                        like)

                        )

                );

            }

            if (status != null) {

                predicate = cb.and(

                        predicate,

                        cb.equal(root.get("status"), status)

                );

            }

            return predicate;

        };

    }

}