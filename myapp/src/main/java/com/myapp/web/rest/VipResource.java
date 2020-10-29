package com.myapp.web.rest;

import com.myapp.domain.Vip;
import com.myapp.repository.VipRepository;
import com.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.myapp.domain.Vip}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VipResource {

    private final Logger log = LoggerFactory.getLogger(VipResource.class);

    private static final String ENTITY_NAME = "vip";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VipRepository vipRepository;

    public VipResource(VipRepository vipRepository) {
        this.vipRepository = vipRepository;
    }

    /**
     * {@code POST  /vips} : Create a new vip.
     *
     * @param vip the vip to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vip, or with status {@code 400 (Bad Request)} if the vip has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vips")
    public ResponseEntity<Vip> createVip(@RequestBody Vip vip) throws URISyntaxException {
        log.debug("REST request to save Vip : {}", vip);
        if (vip.getId() != null) {
            throw new BadRequestAlertException("A new vip cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Vip result = vipRepository.save(vip);
        return ResponseEntity.created(new URI("/api/vips/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vips} : Updates an existing vip.
     *
     * @param vip the vip to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vip,
     * or with status {@code 400 (Bad Request)} if the vip is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vip couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vips")
    public ResponseEntity<Vip> updateVip(@RequestBody Vip vip) throws URISyntaxException {
        log.debug("REST request to update Vip : {}", vip);
        if (vip.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Vip result = vipRepository.save(vip);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vip.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vips} : get all the vips.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vips in body.
     */
    @GetMapping("/vips")
    public List<Vip> getAllVips() {
        log.debug("REST request to get all Vips");
        return vipRepository.findAll();
    }

    /**
     * {@code GET  /vips/:id} : get the "id" vip.
     *
     * @param id the id of the vip to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vip, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vips/{id}")
    public ResponseEntity<Vip> getVip(@PathVariable Long id) {
        log.debug("REST request to get Vip : {}", id);
        Optional<Vip> vip = vipRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vip);
    }

    /**
     * {@code DELETE  /vips/:id} : delete the "id" vip.
     *
     * @param id the id of the vip to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vips/{id}")
    public ResponseEntity<Void> deleteVip(@PathVariable Long id) {
        log.debug("REST request to delete Vip : {}", id);
        vipRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
