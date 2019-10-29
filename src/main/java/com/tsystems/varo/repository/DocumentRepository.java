package com.tsystems.varo.repository;
import com.tsystems.varo.domain.Document;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Document entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    @Query("select document from Document document where document.createdBy.login = ?#{principal.username}")
    List<Document> findByCreatedByIsCurrentUser();

}
