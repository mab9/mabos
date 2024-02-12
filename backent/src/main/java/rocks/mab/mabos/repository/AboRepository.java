package rocks.mab.mabos.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import rocks.mab.mabos.model.Abo;
import rocks.mab.mabos.model.User;

import java.util.Collection;
import java.util.List;

@Repository
public interface AboRepository extends CrudRepository<Abo, Long> {

    Collection<Abo> findByUserEmail(String userEmail);

    @Modifying
    @Query(value = "UPDATE abo SET is_active = false " +
            "WHERE is_active = true " +
            "AND is_auto_renewal = false " +
            "AND start_date + CASE period WHEN 'MONTH' THEN interval '1 month' WHEN 'QUARTER_YEAR' THEN interval '3 months' WHEN 'HALF_YEAR' THEN interval '6 months' WHEN 'YEAR' THEN interval '1 year' END <= CURRENT_DATE", nativeQuery = true)
    void updateActiveStatus();

    // todo figure out how to handle this situation with h2 different interpretation of INTERVAL
    @Modifying
    @Query(value = "UPDATE abo SET is_active = false " +
            "WHERE is_active = true " +
            "AND is_auto_renewal = false " +
            "AND start_date + CASE period WHEN 'MONTH' THEN interval '1' month WHEN 'QUARTER_YEAR' THEN interval '3' month WHEN 'HALF_YEAR' THEN interval '6' month WHEN 'YEAR' THEN interval '1' year END <= CURRENT_DATE", nativeQuery = true)

    void updateActiveStatusH2WorkAround();

}
