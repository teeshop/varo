package com.tsystems.varo.repository;
import com.tsystems.varo.domain.Offer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Offer entity.
 */
@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    @Query(value = "select distinct offer from Offer offer left join fetch offer.customers left join fetch offer.customerManagers left join fetch offer.vendors left join fetch offer.vendorManagers",
        countQuery = "select count(distinct offer) from Offer offer")
    Page<Offer> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct offer from Offer offer left join fetch offer.customers left join fetch offer.customerManagers left join fetch offer.vendors left join fetch offer.vendorManagers")
    List<Offer> findAllWithEagerRelationships();

    @Query("select offer from Offer offer left join fetch offer.customers left join fetch offer.customerManagers left join fetch offer.vendors left join fetch offer.vendorManagers where offer.id =:id")
    Optional<Offer> findOneWithEagerRelationships(@Param("id") Long id);

}
