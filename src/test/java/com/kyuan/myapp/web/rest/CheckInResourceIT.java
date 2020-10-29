package com.kyuan.myapp.web.rest;

import com.kyuan.myapp.MicroserveDhApp;
import com.kyuan.myapp.domain.CheckIn;
import com.kyuan.myapp.repository.CheckInRepository;
import com.kyuan.myapp.service.CheckInService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.kyuan.myapp.domain.enumeration.CheckInStatus;
/**
 * Integration tests for the {@link CheckInResource} REST controller.
 */
@SpringBootTest(classes = MicroserveDhApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CheckInResourceIT {

    private static final LocalDate DEFAULT_START_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_TIME = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_TIME = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_BOOK_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BOOK_TIME = LocalDate.now(ZoneId.systemDefault());

    private static final CheckInStatus DEFAULT_STATUS = CheckInStatus.Waiting;
    private static final CheckInStatus UPDATED_STATUS = CheckInStatus.Leaved;

    @Autowired
    private CheckInRepository checkInRepository;

    @Autowired
    private CheckInService checkInService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCheckInMockMvc;

    private CheckIn checkIn;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CheckIn createEntity(EntityManager em) {
        CheckIn checkIn = new CheckIn()
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .bookTime(DEFAULT_BOOK_TIME)
            .status(DEFAULT_STATUS);
        return checkIn;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CheckIn createUpdatedEntity(EntityManager em) {
        CheckIn checkIn = new CheckIn()
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .bookTime(UPDATED_BOOK_TIME)
            .status(UPDATED_STATUS);
        return checkIn;
    }

    @BeforeEach
    public void initTest() {
        checkIn = createEntity(em);
    }

    @Test
    @Transactional
    public void createCheckIn() throws Exception {
        int databaseSizeBeforeCreate = checkInRepository.findAll().size();
        // Create the CheckIn
        restCheckInMockMvc.perform(post("/api/check-ins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(checkIn)))
            .andExpect(status().isCreated());

        // Validate the CheckIn in the database
        List<CheckIn> checkInList = checkInRepository.findAll();
        assertThat(checkInList).hasSize(databaseSizeBeforeCreate + 1);
        CheckIn testCheckIn = checkInList.get(checkInList.size() - 1);
        assertThat(testCheckIn.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testCheckIn.getEndTime()).isEqualTo(DEFAULT_END_TIME);
        assertThat(testCheckIn.getBookTime()).isEqualTo(DEFAULT_BOOK_TIME);
        assertThat(testCheckIn.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createCheckInWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = checkInRepository.findAll().size();

        // Create the CheckIn with an existing ID
        checkIn.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCheckInMockMvc.perform(post("/api/check-ins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(checkIn)))
            .andExpect(status().isBadRequest());

        // Validate the CheckIn in the database
        List<CheckIn> checkInList = checkInRepository.findAll();
        assertThat(checkInList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCheckIns() throws Exception {
        // Initialize the database
        checkInRepository.saveAndFlush(checkIn);

        // Get all the checkInList
        restCheckInMockMvc.perform(get("/api/check-ins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(checkIn.getId().intValue())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.toString())))
            .andExpect(jsonPath("$.[*].bookTime").value(hasItem(DEFAULT_BOOK_TIME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getCheckIn() throws Exception {
        // Initialize the database
        checkInRepository.saveAndFlush(checkIn);

        // Get the checkIn
        restCheckInMockMvc.perform(get("/api/check-ins/{id}", checkIn.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(checkIn.getId().intValue()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.toString()))
            .andExpect(jsonPath("$.bookTime").value(DEFAULT_BOOK_TIME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCheckIn() throws Exception {
        // Get the checkIn
        restCheckInMockMvc.perform(get("/api/check-ins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCheckIn() throws Exception {
        // Initialize the database
        checkInService.save(checkIn);

        int databaseSizeBeforeUpdate = checkInRepository.findAll().size();

        // Update the checkIn
        CheckIn updatedCheckIn = checkInRepository.findById(checkIn.getId()).get();
        // Disconnect from session so that the updates on updatedCheckIn are not directly saved in db
        em.detach(updatedCheckIn);
        updatedCheckIn
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .bookTime(UPDATED_BOOK_TIME)
            .status(UPDATED_STATUS);

        restCheckInMockMvc.perform(put("/api/check-ins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCheckIn)))
            .andExpect(status().isOk());

        // Validate the CheckIn in the database
        List<CheckIn> checkInList = checkInRepository.findAll();
        assertThat(checkInList).hasSize(databaseSizeBeforeUpdate);
        CheckIn testCheckIn = checkInList.get(checkInList.size() - 1);
        assertThat(testCheckIn.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testCheckIn.getEndTime()).isEqualTo(UPDATED_END_TIME);
        assertThat(testCheckIn.getBookTime()).isEqualTo(UPDATED_BOOK_TIME);
        assertThat(testCheckIn.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingCheckIn() throws Exception {
        int databaseSizeBeforeUpdate = checkInRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCheckInMockMvc.perform(put("/api/check-ins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(checkIn)))
            .andExpect(status().isBadRequest());

        // Validate the CheckIn in the database
        List<CheckIn> checkInList = checkInRepository.findAll();
        assertThat(checkInList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCheckIn() throws Exception {
        // Initialize the database
        checkInService.save(checkIn);

        int databaseSizeBeforeDelete = checkInRepository.findAll().size();

        // Delete the checkIn
        restCheckInMockMvc.perform(delete("/api/check-ins/{id}", checkIn.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CheckIn> checkInList = checkInRepository.findAll();
        assertThat(checkInList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
