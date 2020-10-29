package com.myapp.repository;

import com.myapp.domain.Vip;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Vip entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VipRepository extends JpaRepository<Vip, Long> {
}
