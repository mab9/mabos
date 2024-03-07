package rocks.mab.mabos.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rocks.mab.mabos.model.FeatureFlag;
import rocks.mab.mabos.model.User;
import rocks.mab.mabos.repository.FeatureFlagRepository;

import java.util.Collection;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FeatureFlagService {

    private final FeatureFlagRepository featureFlagRepository;
    private final UserService userService;

    public Collection<FeatureFlag> getAllMyFeatureFlags() {
        User user = userService.currentUser();
        return featureFlagRepository.findByUserEmail(user.getEmail());
    }

    // todo handle errors
    public FeatureFlag update(FeatureFlag item) {
        User user = userService.currentUser();
        Optional<FeatureFlag> optionalItem = featureFlagRepository.findById(item.getId());

        if (optionalItem.isEmpty()) {
            return null;
        }

        if (user.getEmail().equals(optionalItem.get().getUserEmail())) {
            item.setUserEmail(user.getEmail());
            return featureFlagRepository.save(item);
        }
        return null;
    }
}
