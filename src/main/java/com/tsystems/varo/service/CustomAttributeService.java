package com.tsystems.varo.service;

import com.tsystems.varo.domain.CustomAttribute;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link CustomAttribute}.
 */
public interface CustomAttributeService {

    /**
     * Save a customAttribute.
     *
     * @param customAttribute the entity to save.
     * @return the persisted entity.
     */
    CustomAttribute save(CustomAttribute customAttribute);

    /**
     * Get all the customAttributes.
     *
     * @return the list of entities.
     */
    List<CustomAttribute> findAll();


    /**
     * Get the "id" customAttribute.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CustomAttribute> findOne(Long id);

    /**
     * Delete the "id" customAttribute.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
