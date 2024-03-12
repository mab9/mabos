package rocks.mab.mabos.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import rocks.mab.mabos.model.FeatureFlag;

import java.util.Collection;

@Repository
public interface FeatureFlagRepository extends CrudRepository<FeatureFlag, Long> {
}
