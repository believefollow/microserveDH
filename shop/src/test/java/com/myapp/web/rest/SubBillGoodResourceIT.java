package com.myapp.web.rest;

import com.myapp.ShopApp;
import com.myapp.domain.SubBillGood;
import com.myapp.repository.SubBillGoodRepository;

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
 * Integration tests for the {@link SubBillGoodResource} REST controller.
 */
@SpringBootTest(classes = ShopApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SubBillGoodResourceIT {

    private static final Integer DEFAULT_NUMBER = 1;
    private static final Integer UPDATED_NUMBER = 2;

    private static final BigDecimal DEFAULT_TOTAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL = new BigDecimal(2);

    @Autowired
    private SubBillGoodRepository subBillGoodRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubBillGoodMockMvc;

    private SubBillGood subBillGood;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubBillGood createEntity(EntityManager em) {
        SubBillGood subBillGood = new SubBillGood()
            .number(DEFAULT_NUMBER)
            .total(DEFAULT_TOTAL);
        return subBillGood;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubBillGood createUpdatedEntity(EntityManager em) {
        SubBillGood subBillGood = new SubBillGood()
            .number(UPDATED_NUMBER)
            .total(UPDATED_TOTAL);
        return subBillGood;
    }

    @BeforeEach
    public void initTest() {
        subBillGood = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubBillGood() throws Exception {
        int databaseSizeBeforeCreate = subBillGoodRepository.findAll().size();
        // Create the SubBillGood
        restSubBillGoodMockMvc.perform(post("/api/sub-bill-goods")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subBillGood)))
            .andExpect(status().isCreated());

        // Validate the SubBillGood in the database
        List<SubBillGood> subBillGoodList = subBillGoodRepository.findAll();
        assertThat(subBillGoodList).hasSize(databaseSizeBeforeCreate + 1);
        SubBillGood testSubBillGood = subBillGoodList.get(subBillGoodList.size() - 1);
        assertThat(testSubBillGood.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testSubBillGood.getTotal()).isEqualTo(DEFAULT_TOTAL);
    }

    @Test
    @Transactional
    public void createSubBillGoodWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subBillGoodRepository.findAll().size();

        // Create the SubBillGood with an existing ID
        subBillGood.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubBillGoodMockMvc.perform(post("/api/sub-bill-goods")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subBillGood)))
            .andExpect(status().isBadRequest());

        // Validate the SubBillGood in the database
        List<SubBillGood> subBillGoodList = subBillGoodRepository.findAll();
        assertThat(subBillGoodList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSubBillGoods() throws Exception {
        // Initialize the database
        subBillGoodRepository.saveAndFlush(subBillGood);

        // Get all the subBillGoodList
        restSubBillGoodMockMvc.perform(get("/api/sub-bill-goods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subBillGood.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER)))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.intValue())));
    }
    
    @Test
    @Transactional
    public void getSubBillGood() throws Exception {
        // Initialize the database
        subBillGoodRepository.saveAndFlush(subBillGood);

        // Get the subBillGood
        restSubBillGoodMockMvc.perform(get("/api/sub-bill-goods/{id}", subBillGood.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subBillGood.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingSubBillGood() throws Exception {
        // Get the subBillGood
        restSubBillGoodMockMvc.perform(get("/api/sub-bill-goods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubBillGood() throws Exception {
        // Initialize the database
        subBillGoodRepository.saveAndFlush(subBillGood);

        int databaseSizeBeforeUpdate = subBillGoodRepository.findAll().size();

        // Update the subBillGood
        SubBillGood updatedSubBillGood = subBillGoodRepository.findById(subBillGood.getId()).get();
        // Disconnect from session so that the updates on updatedSubBillGood are not directly saved in db
        em.detach(updatedSubBillGood);
        updatedSubBillGood
            .number(UPDATED_NUMBER)
            .total(UPDATED_TOTAL);

        restSubBillGoodMockMvc.perform(put("/api/sub-bill-goods")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubBillGood)))
            .andExpect(status().isOk());

        // Validate the SubBillGood in the database
        List<SubBillGood> subBillGoodList = subBillGoodRepository.findAll();
        assertThat(subBillGoodList).hasSize(databaseSizeBeforeUpdate);
        SubBillGood testSubBillGood = subBillGoodList.get(subBillGoodList.size() - 1);
        assertThat(testSubBillGood.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testSubBillGood.getTotal()).isEqualTo(UPDATED_TOTAL);
    }

    @Test
    @Transactional
    public void updateNonExistingSubBillGood() throws Exception {
        int databaseSizeBeforeUpdate = subBillGoodRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubBillGoodMockMvc.perform(put("/api/sub-bill-goods")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subBillGood)))
            .andExpect(status().isBadRequest());

        // Validate the SubBillGood in the database
        List<SubBillGood> subBillGoodList = subBillGoodRepository.findAll();
        assertThat(subBillGoodList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubBillGood() throws Exception {
        // Initialize the database
        subBillGoodRepository.saveAndFlush(subBillGood);

        int databaseSizeBeforeDelete = subBillGoodRepository.findAll().size();

        // Delete the subBillGood
        restSubBillGoodMockMvc.perform(delete("/api/sub-bill-goods/{id}", subBillGood.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SubBillGood> subBillGoodList = subBillGoodRepository.findAll();
        assertThat(subBillGoodList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
