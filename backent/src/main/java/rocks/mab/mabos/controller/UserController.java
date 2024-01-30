package rocks.mab.mabos.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rocks.mab.mabos.model.User;
import rocks.mab.mabos.service.UserService;

@RestController
@RequestMapping(path = "users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;

    @GetMapping("/me")
    public User getUserDetailsAfterLogin() {
        return userService.currentUser();
    }
}
