package rocks.mab.mabos.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rocks.mab.mabos.model.Abo;
import rocks.mab.mabos.model.User;
import rocks.mab.mabos.repository.AboRepository;

import java.util.Collection;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AboService {

    private final UserService userService;
    private final AboRepository aboRepository;

    public Abo create(Abo item) {
        User user = userService.currentUser();
        item.setUserEmail(user.getEmail());

        if (item.getId() != null) {
            return null; // bla bli blub.... sollte noch was gemacht werden.
        }
        return aboRepository.save(item);
    }

    public Collection<Abo> getAllMyAbos() {
        User user = userService.currentUser();
        return aboRepository.findByUserEmail(user.getEmail());
    }

    public Abo update(Abo item) {
        User user = userService.currentUser();
        Optional<Abo> optionalItem = aboRepository.findById(item.getId());

        if (optionalItem.isEmpty()) {
            return null;
        }

        if (user.getEmail().equals(optionalItem.get().getUserEmail())) {
            item.setUserEmail(user.getEmail());
            return aboRepository.save(item);
        }
        return null;
    }

    public void delete(Long itemId) {
        User user = userService.currentUser();
        Optional<Abo> optionalItem = aboRepository.findById(itemId);

        optionalItem.ifPresent((item) -> {
            if (user.getEmail().equals(item.getUserEmail())) {
                aboRepository.deleteById(itemId);
            }
        });
    }

}
