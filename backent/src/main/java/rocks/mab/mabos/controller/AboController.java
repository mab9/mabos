package rocks.mab.mabos.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import rocks.mab.mabos.model.Abo;
import rocks.mab.mabos.model.User;
import rocks.mab.mabos.service.AboService;
import rocks.mab.mabos.service.UserService;

import java.util.Collection;

@RestController
@RequestMapping(path = "abos")
@RequiredArgsConstructor
public class AboController {

    @Autowired
    private final AboService aboService;

    @GetMapping
    public Collection<Abo> getUserAbos() {
        return aboService.getAllMyAbos();
    }

    @PostMapping
    public Abo create(@RequestBody Abo abo) {
        return aboService.create(abo);
    }

    @PutMapping("{id}")
    public Abo update(@PathVariable Long id, @RequestBody Abo abo) {
        return aboService.update(abo);
    }

    @DeleteMapping("{id}")
    public void update(@PathVariable Long id) {
        aboService.delete(id);
    }

}