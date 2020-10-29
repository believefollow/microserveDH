package com.kyuan.myapp.service;

import com.kyuan.myapp.domain.Vip;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Vip}.
 */
public interface VipService {

    /**
     * Save a vip.
     *
     * @param vip the entity to save.
     * @return the persisted entity.
     */
    Vip save(Vip vip);

    /**
     * Get all the vips.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Vip> findAll(Pageable pageable);


    /**
     * Get the "id" vip.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Vip> findOne(Long id);

    /**
     * Delete the "id" vip.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
