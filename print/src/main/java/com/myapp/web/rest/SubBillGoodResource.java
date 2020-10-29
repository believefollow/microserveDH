package com.myapp.web.rest;

import com.myapp.domain.SubBillGood;
import com.myapp.repository.SubBillGoodRepository;
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
 * REST controller for managing {@link com.myapp.domain.SubBillGood}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SubBillGoodResource {

    private final Logger log = LoggerFactory.getLogger(SubBillGoodResource.class);

    private static final String ENTITY_NAME = "printSubBillGood";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubBillGoodRepository subBillGoodRepository;

    public SubBillGoodResource(SubBillGoodRepository subBillGoodRepository) {
        this.subBillGoodRepository = subBillGoodRepository;
    }

    /**
     * {@code POST  /sub-bill-goods} : Create a new subBillGood.
     *
     * @param subBillGood the subBillGood to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subBillGood, or with status {@code 400 (Bad Request)} if the subBillGood has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sub-bill-goods")
    public ResponseEntity<SubBillGood> createSubBillGood(@RequestBody SubBillGood subBillGood) throws URISyntaxException {
        log.debug("REST request to save SubBillGood : {}", subBillGood);
        if (subBillGood.getId() != null) {
            throw new BadRequestAlertException("A new subBillGood cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubBillGood result = subBillGoodRepository.save(subBillGood);
        return ResponseEntity.created(new URI("/api/sub-bill-goods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sub-bill-goods} : Updates an existing subBillGood.
     *
     * @param subBillGood the subBillGood to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subBillGood,
     * or with status {@code 400 (Bad Request)} if the subBillGood is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subBillGood couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sub-bill-goods")
    public ResponseEntity<SubBillGood> updateSubBillGood(@RequestBody SubBillGood subBillGood) throws URISyntaxException {
        log.debug("REST request to update SubBillGood : {}", subBillGood);
        if (subBillGood.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubBillGood result = subBillGoodRepository.save(subBillGood);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subBillGood.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sub-bill-goods} : get all the subBillGoods.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subBillGoods in body.
     */
    @GetMapping("/sub-bill-goods")
    public List<SubBillGood> getAllSubBillGoods() {
        log.debug("REST request to get all SubBillGoods");
        return subBillGoodRepository.findAll();
    }

    /**
     * {@code GET  /sub-bill-goods/:id} : get the "id" subBillGood.
     *
     * @param id the id of the subBillGood to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subBillGood, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sub-bill-goods/{id}")
    public ResponseEntity<SubBillGood> getSubBillGood(@PathVariable Long id) {
        log.debug("REST request to get SubBillGood : {}", id);
        Optional<SubBillGood> subBillGood = subBillGoodRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subBillGood);
    }

    /**
     * {@code DELETE  /sub-bill-goods/:id} : delete the "id" subBillGood.
     *
     * @param id the id of the subBillGood to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sub-bill-goods/{id}")
    public ResponseEntity<Void> deleteSubBillGood(@PathVariable Long id) {
        log.debug("REST request to delete SubBillGood : {}", id);
        subBillGoodRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
