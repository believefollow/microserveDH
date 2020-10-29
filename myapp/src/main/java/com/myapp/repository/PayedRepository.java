package com.myapp.repository;

import com.myapp.domain.Payed;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Payed entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PayedRepository extends JpaRepository<Payed, Long> {
}
