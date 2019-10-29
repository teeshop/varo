package com.tsystems.varo.repository;
import com.tsystems.varo.domain.CustomAttribute;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomAttribute entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomAttributeRepository extends JpaRepository<CustomAttribute, Long> {

}
