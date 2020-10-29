package com.kyuan.myapp.web.rest;

import com.kyuan.myapp.MicroserveDhApp;
import com.kyuan.myapp.domain.Customer;
import com.kyuan.myapp.repository.CustomerRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.kyuan.myapp.domain.enumeration.Sex;
/**
 * Integration tests for the {@link CustomerResource} REST controller.
 */
@SpringBootTest(classes = MicroserveDhApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CustomerResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ID_CARD = "AAAAAAAAAA";
    private static final String UPDATED_ID_CARD = "BBBBBBBBBB";

    private static final Sex DEFAULT_SEX = Sex.Male;
    private static final Sex UPDATED_SEX = Sex.Female;

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_NATION = "AAAAAAAAAA";
    private static final String UPDATED_NATION = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    private static final byte[] DEFAULT_IMG = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMG = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMG_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMG_CONTENT_TYPE = "image/png";

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCustomerMockMvc;

    private Customer customer;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Customer createEntity(EntityManager em) {
        Customer customer = new Customer()
            .name(DEFAULT_NAME)
            .idCard(DEFAULT_ID_CARD)
            .sex(DEFAULT_SEX)
            .address(DEFAULT_ADDRESS)
            .nation(DEFAULT_NATION)
            .age(DEFAULT_AGE)
            .img(DEFAULT_IMG)
            .imgContentType(DEFAULT_IMG_CONTENT_TYPE);
        return customer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Customer createUpdatedEntity(EntityManager em) {
        Customer customer = new Customer()
            .name(UPDATED_NAME)
            .idCard(UPDATED_ID_CARD)
            .sex(UPDATED_SEX)
            .address(UPDATED_ADDRESS)
            .nation(UPDATED_NATION)
            .age(UPDATED_AGE)
            .img(UPDATED_IMG)
            .imgContentType(UPDATED_IMG_CONTENT_TYPE);
        return customer;
    }

    @BeforeEach
    public void initTest() {
        customer = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomer() throws Exception {
        int databaseSizeBeforeCreate = customerRepository.findAll().size();
        // Create the Customer
        restCustomerMockMvc.perform(post("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customer)))
            .andExpect(status().isCreated());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeCreate + 1);
        Customer testCustomer = customerList.get(customerList.size() - 1);
        assertThat(testCustomer.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCustomer.getIdCard()).isEqualTo(DEFAULT_ID_CARD);
        assertThat(testCustomer.getSex()).isEqualTo(DEFAULT_SEX);
        assertThat(testCustomer.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testCustomer.getNation()).isEqualTo(DEFAULT_NATION);
        assertThat(testCustomer.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testCustomer.getImg()).isEqualTo(DEFAULT_IMG);
        assertThat(testCustomer.getImgContentType()).isEqualTo(DEFAULT_IMG_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createCustomerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerRepository.findAll().size();

        // Create the Customer with an existing ID
        customer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerMockMvc.perform(post("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customer)))
            .andExpect(status().isBadRequest());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCustomers() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        // Get all the customerList
        restCustomerMockMvc.perform(get("/api/customers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].idCard").value(hasItem(DEFAULT_ID_CARD)))
            .andExpect(jsonPath("$.[*].sex").value(hasItem(DEFAULT_SEX.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].nation").value(hasItem(DEFAULT_NATION)))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].imgContentType").value(hasItem(DEFAULT_IMG_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].img").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMG))));
    }
    
    @Test
    @Transactional
    public void getCustomer() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        // Get the customer
        restCustomerMockMvc.perform(get("/api/customers/{id}", customer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(customer.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.idCard").value(DEFAULT_ID_CARD))
            .andExpect(jsonPath("$.sex").value(DEFAULT_SEX.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.nation").value(DEFAULT_NATION))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.imgContentType").value(DEFAULT_IMG_CONTENT_TYPE))
            .andExpect(jsonPath("$.img").value(Base64Utils.encodeToString(DEFAULT_IMG)));
    }
    @Test
    @Transactional
    public void getNonExistingCustomer() throws Exception {
        // Get the customer
        restCustomerMockMvc.perform(get("/api/customers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomer() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        int databaseSizeBeforeUpdate = customerRepository.findAll().size();

        // Update the customer
        Customer updatedCustomer = customerRepository.findById(customer.getId()).get();
        // Disconnect from session so that the updates on updatedCustomer are not directly saved in db
        em.detach(updatedCustomer);
        updatedCustomer
            .name(UPDATED_NAME)
            .idCard(UPDATED_ID_CARD)
            .sex(UPDATED_SEX)
            .address(UPDATED_ADDRESS)
            .nation(UPDATED_NATION)
            .age(UPDATED_AGE)
            .img(UPDATED_IMG)
            .imgContentType(UPDATED_IMG_CONTENT_TYPE);

        restCustomerMockMvc.perform(put("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomer)))
            .andExpect(status().isOk());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeUpdate);
        Customer testCustomer = customerList.get(customerList.size() - 1);
        assertThat(testCustomer.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCustomer.getIdCard()).isEqualTo(UPDATED_ID_CARD);
        assertThat(testCustomer.getSex()).isEqualTo(UPDATED_SEX);
        assertThat(testCustomer.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testCustomer.getNation()).isEqualTo(UPDATED_NATION);
        assertThat(testCustomer.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testCustomer.getImg()).isEqualTo(UPDATED_IMG);
        assertThat(testCustomer.getImgContentType()).isEqualTo(UPDATED_IMG_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomer() throws Exception {
        int databaseSizeBeforeUpdate = customerRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerMockMvc.perform(put("/api/customers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customer)))
            .andExpect(status().isBadRequest());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomer() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        int databaseSizeBeforeDelete = customerRepository.findAll().size();

        // Delete the customer
        restCustomerMockMvc.perform(delete("/api/customers/{id}", customer.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
