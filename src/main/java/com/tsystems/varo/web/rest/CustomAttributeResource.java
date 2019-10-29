package com.tsystems.varo.web.rest;

import com.tsystems.varo.domain.CustomAttribute;
import com.tsystems.varo.service.CustomAttributeService;
import com.tsystems.varo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tsystems.varo.domain.CustomAttribute}.
 */
@RestController
@RequestMapping("/api")
public class CustomAttributeResource {

    private final Logger log = LoggerFactory.getLogger(CustomAttributeResource.class);

    private static final String ENTITY_NAME = "customAttribute";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomAttributeService customAttributeService;

    public CustomAttributeResource(CustomAttributeService customAttributeService) {
        this.customAttributeService = customAttributeService;
    }

    /**
     * {@code POST  /custom-attributes} : Create a new customAttribute.
     *
     * @param customAttribute the customAttribute to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new customAttribute, or with status {@code 400 (Bad Request)} if the customAttribute has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/custom-attributes")
    public ResponseEntity<CustomAttribute> createCustomAttribute(@RequestBody CustomAttribute customAttribute) throws URISyntaxException {
        log.debug("REST request to save CustomAttribute : {}", customAttribute);
        if (customAttribute.getId() != null) {
            throw new BadRequestAlertException("A new customAttribute cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomAttribute result = customAttributeService.save(customAttribute);
        return ResponseEntity.created(new URI("/api/custom-attributes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /custom-attributes} : Updates an existing customAttribute.
     *
     * @param customAttribute the customAttribute to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customAttribute,
     * or with status {@code 400 (Bad Request)} if the customAttribute is not valid,
     * or with status {@code 500 (Internal Server Error)} if the customAttribute couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/custom-attributes")
    public ResponseEntity<CustomAttribute> updateCustomAttribute(@RequestBody CustomAttribute customAttribute) throws URISyntaxException {
        log.debug("REST request to update CustomAttribute : {}", customAttribute);
        if (customAttribute.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomAttribute result = customAttributeService.save(customAttribute);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, customAttribute.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /custom-attributes} : get all the customAttributes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customAttributes in body.
     */
    @GetMapping("/custom-attributes")
    public List<CustomAttribute> getAllCustomAttributes() {
        log.debug("REST request to get all CustomAttributes");
        return customAttributeService.findAll();
    }

    /**
     * {@code GET  /custom-attributes/:id} : get the "id" customAttribute.
     *
     * @param id the id of the customAttribute to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customAttribute, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/custom-attributes/{id}")
    public ResponseEntity<CustomAttribute> getCustomAttribute(@PathVariable Long id) {
        log.debug("REST request to get CustomAttribute : {}", id);
        Optional<CustomAttribute> customAttribute = customAttributeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(customAttribute);
    }

    /**
     * {@code DELETE  /custom-attributes/:id} : delete the "id" customAttribute.
     *
     * @param id the id of the customAttribute to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/custom-attributes/{id}")
    public ResponseEntity<Void> deleteCustomAttribute(@PathVariable Long id) {
        log.debug("REST request to delete CustomAttribute : {}", id);
        customAttributeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
