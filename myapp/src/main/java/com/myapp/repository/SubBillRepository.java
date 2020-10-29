package com.myapp.repository;

import com.myapp.domain.SubBill;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SubBill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubBillRepository extends JpaRepository<SubBill, Long> {
}
