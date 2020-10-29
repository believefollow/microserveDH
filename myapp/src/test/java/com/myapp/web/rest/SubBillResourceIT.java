package com.myapp.web.rest;

import com.myapp.MyappApp;
import com.myapp.domain.SubBill;
import com.myapp.repository.SubBillRepository;

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
import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SubBillResource} REST controller.
 */
@SpringBootTest(classes = MyappApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SubBillResourceIT {

    private static final Integer DEFAULT_NUMBER = 1;
    private static final Integer UPDATED_NUMBER = 2;

    private static final BigDecimal DEFAULT_TOTAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL = new BigDecimal(2);

    @Autowired
    private SubBillRepository subBillRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubBillMockMvc;

    private SubBill subBill;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubBill createEntity(EntityManager em) {
        SubBill subBill = new SubBill()
            .number(DEFAULT_NUMBER)
            .total(DEFAULT_TOTAL);
        return subBill;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubBill createUpdatedEntity(EntityManager em) {
        SubBill subBill = new SubBill()
            .number(UPDATED_NUMBER)
            .total(UPDATED_TOTAL);
        return subBill;
    }

    @BeforeEach
    public void initTest() {
        subBill = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubBill() throws Exception {
        int databaseSizeBeforeCreate = subBillRepository.findAll().size();
        // Create the SubBill
        restSubBillMockMvc.perform(post("/api/sub-bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subBill)))
            .andExpect(status().isCreated());

        // Validate the SubBill in the database
        List<SubBill> subBillList = subBillRepository.findAll();
        assertThat(subBillList).hasSize(databaseSizeBeforeCreate + 1);
        SubBill testSubBill = subBillList.get(subBillList.size() - 1);
        assertThat(testSubBill.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testSubBill.getTotal()).isEqualTo(DEFAULT_TOTAL);
    }

    @Test
    @Transactional
    public void createSubBillWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subBillRepository.findAll().size();

        // Create the SubBill with an existing ID
        subBill.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubBillMockMvc.perform(post("/api/sub-bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subBill)))
            .andExpect(status().isBadRequest());

        // Validate the SubBill in the database
        List<SubBill> subBillList = subBillRepository.findAll();
        assertThat(subBillList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSubBills() throws Exception {
        // Initialize the database
        subBillRepository.saveAndFlush(subBill);

        // Get all the subBillList
        restSubBillMockMvc.perform(get("/api/sub-bills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subBill.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER)))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.intValue())));
    }
    
    @Test
    @Transactional
    public void getSubBill() throws Exception {
        // Initialize the database
        subBillRepository.saveAndFlush(subBill);

        // Get the subBill
        restSubBillMockMvc.perform(get("/api/sub-bills/{id}", subBill.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subBill.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingSubBill() throws Exception {
        // Get the subBill
        restSubBillMockMvc.perform(get("/api/sub-bills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubBill() throws Exception {
        // Initialize the database
        subBillRepository.saveAndFlush(subBill);

        int databaseSizeBeforeUpdate = subBillRepository.findAll().size();

        // Update the subBill
        SubBill updatedSubBill = subBillRepository.findById(subBill.getId()).get();
        // Disconnect from session so that the updates on updatedSubBill are not directly saved in db
        em.detach(updatedSubBill);
        updatedSubBill
            .number(UPDATED_NUMBER)
            .total(UPDATED_TOTAL);

        restSubBillMockMvc.perform(put("/api/sub-bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubBill)))
            .andExpect(status().isOk());

        // Validate the SubBill in the database
        List<SubBill> subBillList = subBillRepository.findAll();
        assertThat(subBillList).hasSize(databaseSizeBeforeUpdate);
        SubBill testSubBill = subBillList.get(subBillList.size() - 1);
        assertThat(testSubBill.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testSubBill.getTotal()).isEqualTo(UPDATED_TOTAL);
    }

    @Test
    @Transactional
    public void updateNonExistingSubBill() throws Exception {
        int databaseSizeBeforeUpdate = subBillRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubBillMockMvc.perform(put("/api/sub-bills")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subBill)))
            .andExpect(status().isBadRequest());

        // Validate the SubBill in the database
        List<SubBill> subBillList = subBillRepository.findAll();
        assertThat(subBillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubBill() throws Exception {
        // Initialize the database
        subBillRepository.saveAndFlush(subBill);

        int databaseSizeBeforeDelete = subBillRepository.findAll().size();

        // Delete the subBill
        restSubBillMockMvc.perform(delete("/api/sub-bills/{id}", subBill.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SubBill> subBillList = subBillRepository.findAll();
        assertThat(subBillList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
