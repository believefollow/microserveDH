package com.myapp.web.rest;

import com.myapp.MyappApp;
import com.myapp.domain.Storage;
import com.myapp.repository.StorageRepository;

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
 * Integration tests for the {@link StorageResource} REST controller.
 */
@SpringBootTest(classes = MyappApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class StorageResourceIT {

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(2);

    private static final Integer DEFAULT_REMAIN = 1;
    private static final Integer UPDATED_REMAIN = 2;

    @Autowired
    private StorageRepository storageRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStorageMockMvc;

    private Storage storage;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Storage createEntity(EntityManager em) {
        Storage storage = new Storage()
            .price(DEFAULT_PRICE)
            .remain(DEFAULT_REMAIN);
        return storage;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Storage createUpdatedEntity(EntityManager em) {
        Storage storage = new Storage()
            .price(UPDATED_PRICE)
            .remain(UPDATED_REMAIN);
        return storage;
    }

    @BeforeEach
    public void initTest() {
        storage = createEntity(em);
    }

    @Test
    @Transactional
    public void createStorage() throws Exception {
        int databaseSizeBeforeCreate = storageRepository.findAll().size();
        // Create the Storage
        restStorageMockMvc.perform(post("/api/storages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(storage)))
            .andExpect(status().isCreated());

        // Validate the Storage in the database
        List<Storage> storageList = storageRepository.findAll();
        assertThat(storageList).hasSize(databaseSizeBeforeCreate + 1);
        Storage testStorage = storageList.get(storageList.size() - 1);
        assertThat(testStorage.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testStorage.getRemain()).isEqualTo(DEFAULT_REMAIN);
    }

    @Test
    @Transactional
    public void createStorageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = storageRepository.findAll().size();

        // Create the Storage with an existing ID
        storage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStorageMockMvc.perform(post("/api/storages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(storage)))
            .andExpect(status().isBadRequest());

        // Validate the Storage in the database
        List<Storage> storageList = storageRepository.findAll();
        assertThat(storageList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllStorages() throws Exception {
        // Initialize the database
        storageRepository.saveAndFlush(storage);

        // Get all the storageList
        restStorageMockMvc.perform(get("/api/storages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(storage.getId().intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].remain").value(hasItem(DEFAULT_REMAIN)));
    }
    
    @Test
    @Transactional
    public void getStorage() throws Exception {
        // Initialize the database
        storageRepository.saveAndFlush(storage);

        // Get the storage
        restStorageMockMvc.perform(get("/api/storages/{id}", storage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(storage.getId().intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.remain").value(DEFAULT_REMAIN));
    }
    @Test
    @Transactional
    public void getNonExistingStorage() throws Exception {
        // Get the storage
        restStorageMockMvc.perform(get("/api/storages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStorage() throws Exception {
        // Initialize the database
        storageRepository.saveAndFlush(storage);

        int databaseSizeBeforeUpdate = storageRepository.findAll().size();

        // Update the storage
        Storage updatedStorage = storageRepository.findById(storage.getId()).get();
        // Disconnect from session so that the updates on updatedStorage are not directly saved in db
        em.detach(updatedStorage);
        updatedStorage
            .price(UPDATED_PRICE)
            .remain(UPDATED_REMAIN);

        restStorageMockMvc.perform(put("/api/storages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedStorage)))
            .andExpect(status().isOk());

        // Validate the Storage in the database
        List<Storage> storageList = storageRepository.findAll();
        assertThat(storageList).hasSize(databaseSizeBeforeUpdate);
        Storage testStorage = storageList.get(storageList.size() - 1);
        assertThat(testStorage.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testStorage.getRemain()).isEqualTo(UPDATED_REMAIN);
    }

    @Test
    @Transactional
    public void updateNonExistingStorage() throws Exception {
        int databaseSizeBeforeUpdate = storageRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStorageMockMvc.perform(put("/api/storages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(storage)))
            .andExpect(status().isBadRequest());

        // Validate the Storage in the database
        List<Storage> storageList = storageRepository.findAll();
        assertThat(storageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStorage() throws Exception {
        // Initialize the database
        storageRepository.saveAndFlush(storage);

        int databaseSizeBeforeDelete = storageRepository.findAll().size();

        // Delete the storage
        restStorageMockMvc.perform(delete("/api/storages/{id}", storage.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Storage> storageList = storageRepository.findAll();
        assertThat(storageList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
