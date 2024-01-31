package rocks.mab.mabos.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import rocks.mab.mabos.model.Abo;
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

    @PutMapping("{id}")
    public User update(@PathVariable Long id, @RequestBody User item) {
        return userService.update(item);
    }
}
