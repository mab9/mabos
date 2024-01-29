package rocks.mab.mabos.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rocks.mab.mabos.model.User;
import rocks.mab.mabos.repository.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping(path = "login")
@RequiredArgsConstructor
public class LoginController {

    @Autowired
    private final UserRepository userRepository;

    @GetMapping("/signin")
    public User getUserDetailsAfterLogin(Authentication authentication) {
        Optional<User> userOptional = userRepository.findByEmail(authentication.getName());
        return userOptional.orElse(null);
    }
}
