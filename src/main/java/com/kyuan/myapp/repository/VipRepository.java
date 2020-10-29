package com.kyuan.myapp.repository;

import com.kyuan.myapp.domain.Vip;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Vip entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VipRepository extends JpaRepository<Vip, Long> {
}
