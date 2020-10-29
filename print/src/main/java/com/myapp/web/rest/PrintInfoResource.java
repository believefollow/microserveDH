package com.myapp.web.rest;

import com.myapp.domain.PrintInfo;
import com.myapp.repository.PrintInfoRepository;
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
 * REST controller for managing {@link com.myapp.domain.PrintInfo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PrintInfoResource {

    private final Logger log = LoggerFactory.getLogger(PrintInfoResource.class);

    private static final String ENTITY_NAME = "printPrintInfo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrintInfoRepository printInfoRepository;

    public PrintInfoResource(PrintInfoRepository printInfoRepository) {
        this.printInfoRepository = printInfoRepository;
    }

    /**
     * {@code POST  /print-infos} : Create a new printInfo.
     *
     * @param printInfo the printInfo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new printInfo, or with status {@code 400 (Bad Request)} if the printInfo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/print-infos")
    public ResponseEntity<PrintInfo> createPrintInfo(@RequestBody PrintInfo printInfo) throws URISyntaxException {
        log.debug("REST request to save PrintInfo : {}", printInfo);
        if (printInfo.getId() != null) {
            throw new BadRequestAlertException("A new printInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PrintInfo result = printInfoRepository.save(printInfo);
        return ResponseEntity.created(new URI("/api/print-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /print-infos} : Updates an existing printInfo.
     *
     * @param printInfo the printInfo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated printInfo,
     * or with status {@code 400 (Bad Request)} if the printInfo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the printInfo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/print-infos")
    public ResponseEntity<PrintInfo> updatePrintInfo(@RequestBody PrintInfo printInfo) throws URISyntaxException {
        log.debug("REST request to update PrintInfo : {}", printInfo);
        if (printInfo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PrintInfo result = printInfoRepository.save(printInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, printInfo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /print-infos} : get all the printInfos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of printInfos in body.
     */
    @GetMapping("/print-infos")
    public List<PrintInfo> getAllPrintInfos() {
        log.debug("REST request to get all PrintInfos");
        return printInfoRepository.findAll();
    }

    /**
     * {@code GET  /print-infos/:id} : get the "id" printInfo.
     *
     * @param id the id of the printInfo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the printInfo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/print-infos/{id}")
    public ResponseEntity<PrintInfo> getPrintInfo(@PathVariable Long id) {
        log.debug("REST request to get PrintInfo : {}", id);
        Optional<PrintInfo> printInfo = printInfoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(printInfo);
    }

    /**
     * {@code DELETE  /print-infos/:id} : delete the "id" printInfo.
     *
     * @param id the id of the printInfo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/print-infos/{id}")
    public ResponseEntity<Void> deletePrintInfo(@PathVariable Long id) {
        log.debug("REST request to delete PrintInfo : {}", id);
        printInfoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
