package com.tsystems.varo.service.impl;

import com.tsystems.varo.service.CustomAttributeService;
import com.tsystems.varo.domain.CustomAttribute;
import com.tsystems.varo.repository.CustomAttributeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CustomAttribute}.
 */
@Service
@Transactional
public class CustomAttributeServiceImpl implements CustomAttributeService {

    private final Logger log = LoggerFactory.getLogger(CustomAttributeServiceImpl.class);

    private final CustomAttributeRepository customAttributeRepository;

    public CustomAttributeServiceImpl(CustomAttributeRepository customAttributeRepository) {
        this.customAttributeRepository = customAttributeRepository;
    }

    /**
     * Save a customAttribute.
     *
     * @param customAttribute the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CustomAttribute save(CustomAttribute customAttribute) {
        log.debug("Request to save CustomAttribute : {}", customAttribute);
        return customAttributeRepository.save(customAttribute);
    }

    /**
     * Get all the customAttributes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CustomAttribute> findAll() {
        log.debug("Request to get all CustomAttributes");
        return customAttributeRepository.findAll();
    }


    /**
     * Get one customAttribute by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CustomAttribute> findOne(Long id) {
        log.debug("Request to get CustomAttribute : {}", id);
        return customAttributeRepository.findById(id);
    }

    /**
     * Delete the customAttribute by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CustomAttribute : {}", id);
        customAttributeRepository.deleteById(id);
    }
}
