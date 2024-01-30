package rocks.mab.mabos.model;

import jakarta.persistence.*;
import lombok.Data;

import java.lang.reflect.Type;
import java.time.LocalDate;

@Data
@Entity
public class Abo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Note: Using int here is fine for serial columns, but consider using a data type like Long for large values.

    private String userEmail;
    private String title;
    private double price;
    @Enumerated(value = EnumType.STRING)
    private Period period;
    private String description;
    private boolean isActive;
    private LocalDate startDate;
}
