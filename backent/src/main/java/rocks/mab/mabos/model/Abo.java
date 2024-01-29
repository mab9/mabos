package rocks.mab.mabos.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Abo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Note: Using int here is fine for serial columns, but consider using a data type like Long for large values.

    private double price;
    private Period period;
    private String description;
    private boolean isActive;
    private LocalDate startDate;
}
