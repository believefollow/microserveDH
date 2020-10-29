package com.myapp.web.rest;

import com.myapp.domain.Payed;
import com.myapp.repository.PayedRepository;
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
 * REST controller for managing {@link com.myapp.domain.Payed}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PayedResource {

    private final Logger log = LoggerFactory.getLogger(PayedResource.class);

    private static final String ENTITY_NAME = "printPayed";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PayedRepository payedRepository;

    public PayedResource(PayedRepository payedRepository) {
        this.payedRepository = payedRepository;
    }

    /**
     * {@code POST  /payeds} : Create a new payed.
     *
     * @param payed the payed to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new payed, or with status {@code 400 (Bad Request)} if the payed has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/payeds")
    public ResponseEntity<Payed> createPayed(@RequestBody Payed payed) throws URISyntaxException {
        log.debug("REST request to save Payed : {}", payed);
        if (payed.getId() != null) {
            throw new BadRequestAlertException("A new payed cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Payed result = payedRepository.save(payed);
        return ResponseEntity.created(new URI("/api/payeds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /payeds} : Updates an existing payed.
     *
     * @param payed the payed to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated payed,
     * or with status {@code 400 (Bad Request)} if the payed is not valid,
     * or with status {@code 500 (Internal Server Error)} if the payed couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/payeds")
    public ResponseEntity<Payed> updatePayed(@RequestBody Payed payed) throws URISyntaxException {
        log.debug("REST request to update Payed : {}", payed);
        if (payed.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Payed result = payedRepository.save(payed);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, payed.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /payeds} : get all the payeds.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of payeds in body.
     */
    @GetMapping("/payeds")
    public List<Payed> getAllPayeds() {
        log.debug("REST request to get all Payeds");
        return payedRepository.findAll();
    }

    /**
     * {@code GET  /payeds/:id} : get the "id" payed.
     *
     * @param id the id of the payed to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the payed, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/payeds/{id}")
    public ResponseEntity<Payed> getPayed(@PathVariable Long id) {
        log.debug("REST request to get Payed : {}", id);
        Optional<Payed> payed = payedRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(payed);
    }

    /**
     * {@code DELETE  /payeds/:id} : delete the "id" payed.
     *
     * @param id the id of the payed to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/payeds/{id}")
    public ResponseEntity<Void> deletePayed(@PathVariable Long id) {
        log.debug("REST request to delete Payed : {}", id);
        payedRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
