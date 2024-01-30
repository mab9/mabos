package rocks.mab.mabos.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rocks.mab.mabos.model.Abo;
import rocks.mab.mabos.model.User;
import rocks.mab.mabos.repository.AboRepository;
import rocks.mab.mabos.service.UserService;

import java.util.Collection;

@RestController
@RequestMapping(path = "abos")
@RequiredArgsConstructor
public class AboController {

    @Autowired
    private final AboRepository aboRepository;

    @Autowired
    private final UserService userService;

    @GetMapping// todo replace param with - retrieve user email by context...
    public Collection<Abo> getUserAbos() {
        User user = userService.currentUser();
        return aboRepository.findByUserEmail(user.getEmail());
    }

}