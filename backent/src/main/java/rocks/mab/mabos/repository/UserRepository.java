package rocks.mab.mabos.repository;

import org.springframework.data.repository.CrudRepository;
import rocks.mab.mabos.model.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
