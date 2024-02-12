package rocks.mab.mabos.scheduler;

import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import rocks.mab.mabos.repository.AboRepository;

@Component
public class AboUpdateScheduler {

    private final AboRepository aboRepository; // Ensure this is your repository

    public AboUpdateScheduler(AboRepository aboRepository) {
        this.aboRepository = aboRepository;
    }

   // @Scheduled(cron = "0 0 0 * * ?") // Runs at midnight every day
    @Scheduled(cron = "0 0 * * * ?") // Runs at the start of every hour.
    @Transactional
    public void updateAbos() {
        aboRepository.updateActiveStatus();
    }
}