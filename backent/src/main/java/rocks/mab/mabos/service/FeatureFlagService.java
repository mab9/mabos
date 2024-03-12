package rocks.mab.mabos.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rocks.mab.mabos.model.FeatureFlag;
import rocks.mab.mabos.repository.FeatureFlagRepository;

@Service
@RequiredArgsConstructor
public class FeatureFlagService {

    private final FeatureFlagRepository featureFlagRepository;
    public Iterable<FeatureFlag> getAll() {
        return featureFlagRepository.findAll();
    }
}
