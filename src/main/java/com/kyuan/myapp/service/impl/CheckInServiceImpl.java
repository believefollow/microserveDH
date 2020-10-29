package com.kyuan.myapp.service.impl;

import com.kyuan.myapp.service.CheckInService;
import com.kyuan.myapp.domain.CheckIn;
import com.kyuan.myapp.repository.CheckInRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link CheckIn}.
 */
@Service
@Transactional
public class CheckInServiceImpl implements CheckInService {

    private final Logger log = LoggerFactory.getLogger(CheckInServiceImpl.class);

    private final CheckInRepository checkInRepository;

    public CheckInServiceImpl(CheckInRepository checkInRepository) {
        this.checkInRepository = checkInRepository;
    }

    @Override
    public CheckIn save(CheckIn checkIn) {
        log.debug("Request to save CheckIn : {}", checkIn);
        return checkInRepository.save(checkIn);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CheckIn> findAll(Pageable pageable) {
        log.debug("Request to get all CheckIns");
        return checkInRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<CheckIn> findOne(Long id) {
        log.debug("Request to get CheckIn : {}", id);
        return checkInRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CheckIn : {}", id);
        checkInRepository.deleteById(id);
    }
}
