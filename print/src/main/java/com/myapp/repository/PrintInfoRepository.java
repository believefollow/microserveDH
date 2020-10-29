package com.myapp.repository;

import com.myapp.domain.PrintInfo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PrintInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrintInfoRepository extends JpaRepository<PrintInfo, Long> {
}
