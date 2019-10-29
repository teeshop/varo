package com.tsystems.varo.web.rest;

import com.tsystems.varo.VaroApp;
import com.tsystems.varo.domain.CustomAttribute;
import com.tsystems.varo.repository.CustomAttributeRepository;
import com.tsystems.varo.service.CustomAttributeService;
import com.tsystems.varo.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.tsystems.varo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CustomAttributeResource} REST controller.
 */
@SpringBootTest(classes = VaroApp.class)
public class CustomAttributeResourceIT {

    private static final String DEFAULT_KEY = "AAAAAAAAAA";
    private static final String UPDATED_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private CustomAttributeRepository customAttributeRepository;

    @Autowired
    private CustomAttributeService customAttributeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCustomAttributeMockMvc;

    private CustomAttribute customAttribute;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomAttributeResource customAttributeResource = new CustomAttributeResource(customAttributeService);
        this.restCustomAttributeMockMvc = MockMvcBuilders.standaloneSetup(customAttributeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomAttribute createEntity(EntityManager em) {
        CustomAttribute customAttribute = new CustomAttribute()
            .key(DEFAULT_KEY)
            .value(DEFAULT_VALUE);
        return customAttribute;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomAttribute createUpdatedEntity(EntityManager em) {
        CustomAttribute customAttribute = new CustomAttribute()
            .key(UPDATED_KEY)
            .value(UPDATED_VALUE);
        return customAttribute;
    }

    @BeforeEach
    public void initTest() {
        customAttribute = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomAttribute() throws Exception {
        int databaseSizeBeforeCreate = customAttributeRepository.findAll().size();

        // Create the CustomAttribute
        restCustomAttributeMockMvc.perform(post("/api/custom-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customAttribute)))
            .andExpect(status().isCreated());

        // Validate the CustomAttribute in the database
        List<CustomAttribute> customAttributeList = customAttributeRepository.findAll();
        assertThat(customAttributeList).hasSize(databaseSizeBeforeCreate + 1);
        CustomAttribute testCustomAttribute = customAttributeList.get(customAttributeList.size() - 1);
        assertThat(testCustomAttribute.getKey()).isEqualTo(DEFAULT_KEY);
        assertThat(testCustomAttribute.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createCustomAttributeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customAttributeRepository.findAll().size();

        // Create the CustomAttribute with an existing ID
        customAttribute.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomAttributeMockMvc.perform(post("/api/custom-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customAttribute)))
            .andExpect(status().isBadRequest());

        // Validate the CustomAttribute in the database
        List<CustomAttribute> customAttributeList = customAttributeRepository.findAll();
        assertThat(customAttributeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCustomAttributes() throws Exception {
        // Initialize the database
        customAttributeRepository.saveAndFlush(customAttribute);

        // Get all the customAttributeList
        restCustomAttributeMockMvc.perform(get("/api/custom-attributes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customAttribute.getId().intValue())))
            .andExpect(jsonPath("$.[*].key").value(hasItem(DEFAULT_KEY)))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)));
    }
    
    @Test
    @Transactional
    public void getCustomAttribute() throws Exception {
        // Initialize the database
        customAttributeRepository.saveAndFlush(customAttribute);

        // Get the customAttribute
        restCustomAttributeMockMvc.perform(get("/api/custom-attributes/{id}", customAttribute.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customAttribute.getId().intValue()))
            .andExpect(jsonPath("$.key").value(DEFAULT_KEY))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE));
    }

    @Test
    @Transactional
    public void getNonExistingCustomAttribute() throws Exception {
        // Get the customAttribute
        restCustomAttributeMockMvc.perform(get("/api/custom-attributes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomAttribute() throws Exception {
        // Initialize the database
        customAttributeService.save(customAttribute);

        int databaseSizeBeforeUpdate = customAttributeRepository.findAll().size();

        // Update the customAttribute
        CustomAttribute updatedCustomAttribute = customAttributeRepository.findById(customAttribute.getId()).get();
        // Disconnect from session so that the updates on updatedCustomAttribute are not directly saved in db
        em.detach(updatedCustomAttribute);
        updatedCustomAttribute
            .key(UPDATED_KEY)
            .value(UPDATED_VALUE);

        restCustomAttributeMockMvc.perform(put("/api/custom-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomAttribute)))
            .andExpect(status().isOk());

        // Validate the CustomAttribute in the database
        List<CustomAttribute> customAttributeList = customAttributeRepository.findAll();
        assertThat(customAttributeList).hasSize(databaseSizeBeforeUpdate);
        CustomAttribute testCustomAttribute = customAttributeList.get(customAttributeList.size() - 1);
        assertThat(testCustomAttribute.getKey()).isEqualTo(UPDATED_KEY);
        assertThat(testCustomAttribute.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomAttribute() throws Exception {
        int databaseSizeBeforeUpdate = customAttributeRepository.findAll().size();

        // Create the CustomAttribute

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomAttributeMockMvc.perform(put("/api/custom-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customAttribute)))
            .andExpect(status().isBadRequest());

        // Validate the CustomAttribute in the database
        List<CustomAttribute> customAttributeList = customAttributeRepository.findAll();
        assertThat(customAttributeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomAttribute() throws Exception {
        // Initialize the database
        customAttributeService.save(customAttribute);

        int databaseSizeBeforeDelete = customAttributeRepository.findAll().size();

        // Delete the customAttribute
        restCustomAttributeMockMvc.perform(delete("/api/custom-attributes/{id}", customAttribute.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CustomAttribute> customAttributeList = customAttributeRepository.findAll();
        assertThat(customAttributeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomAttribute.class);
        CustomAttribute customAttribute1 = new CustomAttribute();
        customAttribute1.setId(1L);
        CustomAttribute customAttribute2 = new CustomAttribute();
        customAttribute2.setId(customAttribute1.getId());
        assertThat(customAttribute1).isEqualTo(customAttribute2);
        customAttribute2.setId(2L);
        assertThat(customAttribute1).isNotEqualTo(customAttribute2);
        customAttribute1.setId(null);
        assertThat(customAttribute1).isNotEqualTo(customAttribute2);
    }
}
