package com.myapp.web.rest;

import com.myapp.HotelApp;
import com.myapp.domain.Payed;
import com.myapp.repository.PayedRepository;

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

import com.myapp.domain.enumeration.Source;
/**
 * Integration tests for the {@link PayedResource} REST controller.
 */
@SpringBootTest(classes = HotelApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PayedResourceIT {

    private static final Source DEFAULT_SOURCE = Source.AliPay;
    private static final Source UPDATED_SOURCE = Source.WeChat;

    private static final String DEFAULT_PAY_ID = "AAAAAAAAAA";
    private static final String UPDATED_PAY_ID = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    @Autowired
    private PayedRepository payedRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPayedMockMvc;

    private Payed payed;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Payed createEntity(EntityManager em) {
        Payed payed = new Payed()
            .source(DEFAULT_SOURCE)
            .payId(DEFAULT_PAY_ID)
            .amount(DEFAULT_AMOUNT);
        return payed;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Payed createUpdatedEntity(EntityManager em) {
        Payed payed = new Payed()
            .source(UPDATED_SOURCE)
            .payId(UPDATED_PAY_ID)
            .amount(UPDATED_AMOUNT);
        return payed;
    }

    @BeforeEach
    public void initTest() {
        payed = createEntity(em);
    }

    @Test
    @Transactional
    public void createPayed() throws Exception {
        int databaseSizeBeforeCreate = payedRepository.findAll().size();
        // Create the Payed
        restPayedMockMvc.perform(post("/api/payeds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(payed)))
            .andExpect(status().isCreated());

        // Validate the Payed in the database
        List<Payed> payedList = payedRepository.findAll();
        assertThat(payedList).hasSize(databaseSizeBeforeCreate + 1);
        Payed testPayed = payedList.get(payedList.size() - 1);
        assertThat(testPayed.getSource()).isEqualTo(DEFAULT_SOURCE);
        assertThat(testPayed.getPayId()).isEqualTo(DEFAULT_PAY_ID);
        assertThat(testPayed.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createPayedWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = payedRepository.findAll().size();

        // Create the Payed with an existing ID
        payed.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPayedMockMvc.perform(post("/api/payeds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(payed)))
            .andExpect(status().isBadRequest());

        // Validate the Payed in the database
        List<Payed> payedList = payedRepository.findAll();
        assertThat(payedList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPayeds() throws Exception {
        // Initialize the database
        payedRepository.saveAndFlush(payed);

        // Get all the payedList
        restPayedMockMvc.perform(get("/api/payeds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(payed.getId().intValue())))
            .andExpect(jsonPath("$.[*].source").value(hasItem(DEFAULT_SOURCE.toString())))
            .andExpect(jsonPath("$.[*].payId").value(hasItem(DEFAULT_PAY_ID)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())));
    }
    
    @Test
    @Transactional
    public void getPayed() throws Exception {
        // Initialize the database
        payedRepository.saveAndFlush(payed);

        // Get the payed
        restPayedMockMvc.perform(get("/api/payeds/{id}", payed.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(payed.getId().intValue()))
            .andExpect(jsonPath("$.source").value(DEFAULT_SOURCE.toString()))
            .andExpect(jsonPath("$.payId").value(DEFAULT_PAY_ID))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPayed() throws Exception {
        // Get the payed
        restPayedMockMvc.perform(get("/api/payeds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePayed() throws Exception {
        // Initialize the database
        payedRepository.saveAndFlush(payed);

        int databaseSizeBeforeUpdate = payedRepository.findAll().size();

        // Update the payed
        Payed updatedPayed = payedRepository.findById(payed.getId()).get();
        // Disconnect from session so that the updates on updatedPayed are not directly saved in db
        em.detach(updatedPayed);
        updatedPayed
            .source(UPDATED_SOURCE)
            .payId(UPDATED_PAY_ID)
            .amount(UPDATED_AMOUNT);

        restPayedMockMvc.perform(put("/api/payeds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPayed)))
            .andExpect(status().isOk());

        // Validate the Payed in the database
        List<Payed> payedList = payedRepository.findAll();
        assertThat(payedList).hasSize(databaseSizeBeforeUpdate);
        Payed testPayed = payedList.get(payedList.size() - 1);
        assertThat(testPayed.getSource()).isEqualTo(UPDATED_SOURCE);
        assertThat(testPayed.getPayId()).isEqualTo(UPDATED_PAY_ID);
        assertThat(testPayed.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingPayed() throws Exception {
        int databaseSizeBeforeUpdate = payedRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPayedMockMvc.perform(put("/api/payeds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(payed)))
            .andExpect(status().isBadRequest());

        // Validate the Payed in the database
        List<Payed> payedList = payedRepository.findAll();
        assertThat(payedList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePayed() throws Exception {
        // Initialize the database
        payedRepository.saveAndFlush(payed);

        int databaseSizeBeforeDelete = payedRepository.findAll().size();

        // Delete the payed
        restPayedMockMvc.perform(delete("/api/payeds/{id}", payed.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Payed> payedList = payedRepository.findAll();
        assertThat(payedList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
