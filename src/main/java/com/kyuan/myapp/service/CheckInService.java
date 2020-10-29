package com.kyuan.myapp.service;

import com.kyuan.myapp.domain.CheckIn;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link CheckIn}.
 */
public interface CheckInService {

    /**
     * Save a checkIn.
     *
     * @param checkIn the entity to save.
     * @return the persisted entity.
     */
    CheckIn save(CheckIn checkIn);

    /**
     * Get all the checkIns.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CheckIn> findAll(Pageable pageable);


    /**
     * Get the "id" checkIn.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CheckIn> findOne(Long id);

    /**
     * Delete the "id" checkIn.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
