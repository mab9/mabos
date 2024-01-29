package rocks.mab.mabos.repository;

import org.springframework.data.repository.CrudRepository;
import rocks.mab.mabos.model.Abo;
import rocks.mab.mabos.model.User;

import java.util.Collection;
import java.util.List;

public interface AboRepository extends CrudRepository<Abo, Long> {

    Collection<Abo> findByUserEmail(String userEmail);

}
