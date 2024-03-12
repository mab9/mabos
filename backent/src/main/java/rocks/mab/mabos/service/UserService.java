package rocks.mab.mabos.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import rocks.mab.mabos.model.FeatureFlag;
import rocks.mab.mabos.model.User;
import rocks.mab.mabos.repository.UserRepository;

import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final FeatureFlagService featureFlagService;

    // helper method until I figured out a better solution to resolve the user from JWT token.
    public User currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            return null;
        }
        Jwt jwt = (Jwt) auth.getPrincipal();
        String email = jwt.getClaims().get("email").toString();
        Optional<User> userOptional = userRepository.findByEmail(email);
        return userOptional.orElse(null);
    }

    public User update(User item) {
        User user = currentUser();
        if (user.getEmail().equals(item.getEmail())) {
            user.setSendEmailReminders(item.isSendEmailReminders());
            Iterable<FeatureFlag> all = featureFlagService.getAll();

            // todo impl contains all feature flags.
            // may only update activeness of a feature flag


            Stream.of(all).forEach(flag -> {
                boolean noneMatch = user.getUserFeatureFlags().stream().noneMatch(userFlag -> flag.equals(userFlag.getFeatureFlag()));
                if (noneMatch) {
                    // todo add to user...
                }
            });

            // user may only update activeness of a feature
            user.getUserFeatureFlags();
            userRepository.save(user);
        }
        return user;
    }
}
