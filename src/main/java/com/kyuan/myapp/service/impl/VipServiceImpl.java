package com.kyuan.myapp.service.impl;

import com.kyuan.myapp.service.VipService;
import com.kyuan.myapp.domain.Vip;
import com.kyuan.myapp.repository.VipRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Vip}.
 */
@Service
@Transactional
public class VipServiceImpl implements VipService {

    private final Logger log = LoggerFactory.getLogger(VipServiceImpl.class);

    private final VipRepository vipRepository;

    public VipServiceImpl(VipRepository vipRepository) {
        this.vipRepository = vipRepository;
    }

    @Override
    public Vip save(Vip vip) {
        log.debug("Request to save Vip : {}", vip);
        return vipRepository.save(vip);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Vip> findAll(Pageable pageable) {
        log.debug("Request to get all Vips");
        return vipRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Vip> findOne(Long id) {
        log.debug("Request to get Vip : {}", id);
        return vipRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Vip : {}", id);
        vipRepository.deleteById(id);
    }
}
