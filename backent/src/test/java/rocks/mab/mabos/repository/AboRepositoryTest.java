package rocks.mab.mabos.repository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import rocks.mab.mabos.model.Abo;
import rocks.mab.mabos.model.Period;
import rocks.mab.mabos.model.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase
public class AboRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private AboRepository aboRepository;

    // for sake of simplicity to avoid to handle entity manager configuration on static setup method...
    @BeforeEach
    public void setup() {
        User user = new User();
        user.setName("mab9");
        user.setEmail("mab9@mab.rocks");
        user.setRole("ADMIN");
        user.setSendEmailReminders(false);
        user.setCreateDate(LocalDateTime.now());
        entityManager.persist(user);
        entityManager.flush();
    }

    @AfterEach
    public void tearDown() {
        // First, delete all entries from Abo to avoid foreign key constraints issues
        entityManager.getEntityManager()
                .createQuery("DELETE FROM Abo")
                .executeUpdate();

        // Then, delete all entries from User
        entityManager.getEntityManager()
                .createQuery("DELETE FROM User")
                .executeUpdate();
    }

    private Abo createAbo(boolean isActive, boolean isAutoRenewal, LocalDate startDate) {
        // Given
        Abo abo = new Abo();
        abo.setActive(isActive);
        abo.setAutoRenewal(isAutoRenewal);
        abo.setStartDate(startDate);
        abo.setPeriod(Period.MONTH);

        abo.setUserEmail("mab9@mab.rocks");
        abo.setTitle("newspaper");
        abo.setPrice(5);
        abo.setExpReminderPeriod(Period.MONTH);

        entityManager.persist(abo);
        entityManager.flush();
        return abo;
    }

    @Test
    public void updateActiveStatus_noAutoRenewalAndAlreadyOutDated() {
        // Given
        LocalDate startDate = LocalDate.now().minusMonths(2);// This should make the Abo inactive
        Abo abo = createAbo(true, false, startDate);


        // When
        aboRepository.updateActiveStatusH2WorkAround();
        entityManager.clear(); // Clear the persistence context to force a re-read from the database

        // Then
        Abo updatedAbo = entityManager.find(Abo.class, abo.getId());
        assertFalse(updatedAbo.isActive());
    }

    @Test
    public void updateActiveStatus_noAutoRenewalAndStartDayLastWeek() {
        // Given
        LocalDate startDate = LocalDate.now().minusWeeks(2);
        Abo abo = createAbo(true, false, startDate);


        // When
        aboRepository.updateActiveStatusH2WorkAround();
        entityManager.clear(); // Clear the persistence context to force a re-read from the database

        // Then
        Abo updatedAbo = entityManager.find(Abo.class, abo.getId());
        assertTrue(updatedAbo.isActive());
    }

    @Test
    public void updateActiveStatus_noAutoRenewalAndStartDayLastWeek_withAboInactive() {
        // Given
        LocalDate startDate = LocalDate.now().minusWeeks(2);
        Abo abo = createAbo(false, false, startDate);


        // When
        aboRepository.updateActiveStatusH2WorkAround();
        entityManager.clear(); // Clear the persistence context to force a re-read from the database

        // Then
        Abo updatedAbo = entityManager.find(Abo.class, abo.getId());
        assertFalse(updatedAbo.isActive());
    }

    @Test
    public void updateActiveStatus_withAutoRenewalAndStartDayInPast() {
        // Given
        LocalDate startDate = LocalDate.now().minusMonths(2);
        Abo abo = createAbo(true, true, startDate);

        // When
        aboRepository.updateActiveStatusH2WorkAround();
        entityManager.clear(); // Clear the persistence context to force a re-read from the database

        // Then
        Abo updatedAbo = entityManager.find(Abo.class, abo.getId());
        assertTrue(updatedAbo.isActive());
    }

    // TODO address this miss understanding
    // this is a bit strange, but I decided for the moment, to keep it as is.
    // When a user sets abo to active, he might want to see the current costs.
    // this possible miss understanding should be addressed.

    @Test
    public void updateActiveStatus_withAutoRenewalAndStartDayInFuture() {
        // Given
        LocalDate startDate = LocalDate.now().plusMonths(2);// This should make the Abo inactive
        Abo abo = createAbo(true, true, startDate);

        // When
        aboRepository.updateActiveStatusH2WorkAround();
        entityManager.clear(); // Clear the persistence context to force a re-read from the database

        // Then
        Abo updatedAbo = entityManager.find(Abo.class, abo.getId());
        assertTrue(updatedAbo.isActive());
    }
}