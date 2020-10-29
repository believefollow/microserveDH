package com.myapp.repository;

import com.myapp.domain.Storage;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Storage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StorageRepository extends JpaRepository<Storage, Long> {
}
