package rocks.mab.mabos.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import rocks.mab.mabos.model.User;
import rocks.mab.mabos.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

// Keycloak will return an access_token with user information.
// It is the responsibility of the app to understand those information.
// Roles, Authorities, etc..
@Component
public class KeycloakJwtConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    @Autowired
    private UserRepository userRepository;


    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        Map<String, Object> realmAccess = (Map<String, Object>) jwt.getClaims().get("realm_access");

        if (realmAccess == null || realmAccess.isEmpty()) {
            return new ArrayList<>();
        }


        String email = jwt.getClaims().get("email").toString();

        // todo improve this check with token that is set via JWT to avoid DB access.
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            // init user
            User newUser = new User();
            newUser.setCreateDate(LocalDateTime.now());
            newUser.setRole("USER");
            newUser.setEmail(email);
            newUser.setName("name");
            newUser.setSendEmailReminders(true);
            userRepository.save(newUser);
        }

        Collection<GrantedAuthority> returnValue = ((List<String>) realmAccess.get("roles"))
                .stream().map(roleName -> "ROLE_" + roleName)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return returnValue;
    }
}
