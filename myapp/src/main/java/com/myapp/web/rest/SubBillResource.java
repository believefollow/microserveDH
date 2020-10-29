package com.myapp.web.rest;

import com.myapp.domain.SubBill;
import com.myapp.repository.SubBillRepository;
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
 * REST controller for managing {@link com.myapp.domain.SubBill}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SubBillResource {

    private final Logger log = LoggerFactory.getLogger(SubBillResource.class);

    private static final String ENTITY_NAME = "subBill";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubBillRepository subBillRepository;

    public SubBillResource(SubBillRepository subBillRepository) {
        this.subBillRepository = subBillRepository;
    }

    /**
     * {@code POST  /sub-bills} : Create a new subBill.
     *
     * @param subBill the subBill to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subBill, or with status {@code 400 (Bad Request)} if the subBill has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sub-bills")
    public ResponseEntity<SubBill> createSubBill(@RequestBody SubBill subBill) throws URISyntaxException {
        log.debug("REST request to save SubBill : {}", subBill);
        if (subBill.getId() != null) {
            throw new BadRequestAlertException("A new subBill cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubBill result = subBillRepository.save(subBill);
        return ResponseEntity.created(new URI("/api/sub-bills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sub-bills} : Updates an existing subBill.
     *
     * @param subBill the subBill to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subBill,
     * or with status {@code 400 (Bad Request)} if the subBill is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subBill couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sub-bills")
    public ResponseEntity<SubBill> updateSubBill(@RequestBody SubBill subBill) throws URISyntaxException {
        log.debug("REST request to update SubBill : {}", subBill);
        if (subBill.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubBill result = subBillRepository.save(subBill);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subBill.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sub-bills} : get all the subBills.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subBills in body.
     */
    @GetMapping("/sub-bills")
    public List<SubBill> getAllSubBills() {
        log.debug("REST request to get all SubBills");
        return subBillRepository.findAll();
    }

    /**
     * {@code GET  /sub-bills/:id} : get the "id" subBill.
     *
     * @param id the id of the subBill to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subBill, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sub-bills/{id}")
    public ResponseEntity<SubBill> getSubBill(@PathVariable Long id) {
        log.debug("REST request to get SubBill : {}", id);
        Optional<SubBill> subBill = subBillRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subBill);
    }

    /**
     * {@code DELETE  /sub-bills/:id} : delete the "id" subBill.
     *
     * @param id the id of the subBill to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sub-bills/{id}")
    public ResponseEntity<Void> deleteSubBill(@PathVariable Long id) {
        log.debug("REST request to delete SubBill : {}", id);
        subBillRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
