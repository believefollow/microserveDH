package com.myapp.web.rest;

import com.myapp.PrintApp;
import com.myapp.domain.PrintInfo;
import com.myapp.repository.PrintInfoRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PrintInfoResource} REST controller.
 */
@SpringBootTest(classes = PrintApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PrintInfoResourceIT {

    private static final String DEFAULT_BASE_INFO = "AAAAAAAAAA";
    private static final String UPDATED_BASE_INFO = "BBBBBBBBBB";

    @Autowired
    private PrintInfoRepository printInfoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPrintInfoMockMvc;

    private PrintInfo printInfo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrintInfo createEntity(EntityManager em) {
        PrintInfo printInfo = new PrintInfo()
            .baseInfo(DEFAULT_BASE_INFO);
        return printInfo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PrintInfo createUpdatedEntity(EntityManager em) {
        PrintInfo printInfo = new PrintInfo()
            .baseInfo(UPDATED_BASE_INFO);
        return printInfo;
    }

    @BeforeEach
    public void initTest() {
        printInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrintInfo() throws Exception {
        int databaseSizeBeforeCreate = printInfoRepository.findAll().size();
        // Create the PrintInfo
        restPrintInfoMockMvc.perform(post("/api/print-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(printInfo)))
            .andExpect(status().isCreated());

        // Validate the PrintInfo in the database
        List<PrintInfo> printInfoList = printInfoRepository.findAll();
        assertThat(printInfoList).hasSize(databaseSizeBeforeCreate + 1);
        PrintInfo testPrintInfo = printInfoList.get(printInfoList.size() - 1);
        assertThat(testPrintInfo.getBaseInfo()).isEqualTo(DEFAULT_BASE_INFO);
    }

    @Test
    @Transactional
    public void createPrintInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = printInfoRepository.findAll().size();

        // Create the PrintInfo with an existing ID
        printInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrintInfoMockMvc.perform(post("/api/print-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(printInfo)))
            .andExpect(status().isBadRequest());

        // Validate the PrintInfo in the database
        List<PrintInfo> printInfoList = printInfoRepository.findAll();
        assertThat(printInfoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPrintInfos() throws Exception {
        // Initialize the database
        printInfoRepository.saveAndFlush(printInfo);

        // Get all the printInfoList
        restPrintInfoMockMvc.perform(get("/api/print-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(printInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].baseInfo").value(hasItem(DEFAULT_BASE_INFO)));
    }
    
    @Test
    @Transactional
    public void getPrintInfo() throws Exception {
        // Initialize the database
        printInfoRepository.saveAndFlush(printInfo);

        // Get the printInfo
        restPrintInfoMockMvc.perform(get("/api/print-infos/{id}", printInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(printInfo.getId().intValue()))
            .andExpect(jsonPath("$.baseInfo").value(DEFAULT_BASE_INFO));
    }
    @Test
    @Transactional
    public void getNonExistingPrintInfo() throws Exception {
        // Get the printInfo
        restPrintInfoMockMvc.perform(get("/api/print-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrintInfo() throws Exception {
        // Initialize the database
        printInfoRepository.saveAndFlush(printInfo);

        int databaseSizeBeforeUpdate = printInfoRepository.findAll().size();

        // Update the printInfo
        PrintInfo updatedPrintInfo = printInfoRepository.findById(printInfo.getId()).get();
        // Disconnect from session so that the updates on updatedPrintInfo are not directly saved in db
        em.detach(updatedPrintInfo);
        updatedPrintInfo
            .baseInfo(UPDATED_BASE_INFO);

        restPrintInfoMockMvc.perform(put("/api/print-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrintInfo)))
            .andExpect(status().isOk());

        // Validate the PrintInfo in the database
        List<PrintInfo> printInfoList = printInfoRepository.findAll();
        assertThat(printInfoList).hasSize(databaseSizeBeforeUpdate);
        PrintInfo testPrintInfo = printInfoList.get(printInfoList.size() - 1);
        assertThat(testPrintInfo.getBaseInfo()).isEqualTo(UPDATED_BASE_INFO);
    }

    @Test
    @Transactional
    public void updateNonExistingPrintInfo() throws Exception {
        int databaseSizeBeforeUpdate = printInfoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrintInfoMockMvc.perform(put("/api/print-infos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(printInfo)))
            .andExpect(status().isBadRequest());

        // Validate the PrintInfo in the database
        List<PrintInfo> printInfoList = printInfoRepository.findAll();
        assertThat(printInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrintInfo() throws Exception {
        // Initialize the database
        printInfoRepository.saveAndFlush(printInfo);

        int databaseSizeBeforeDelete = printInfoRepository.findAll().size();

        // Delete the printInfo
        restPrintInfoMockMvc.perform(delete("/api/print-infos/{id}", printInfo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PrintInfo> printInfoList = printInfoRepository.findAll();
        assertThat(printInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
