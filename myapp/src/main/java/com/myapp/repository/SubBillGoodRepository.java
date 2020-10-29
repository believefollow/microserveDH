package com.myapp.repository;

import com.myapp.domain.SubBillGood;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SubBillGood entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubBillGoodRepository extends JpaRepository<SubBillGood, Long> {
}
