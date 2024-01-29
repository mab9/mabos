package rocks.mab.mabos.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "USERS") // user is a reserved key word
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int id; // Note: Using int here is fine for serial columns, but consider using a data type like Long for large values.
    private String email;
    private String name;
    private String role;

    private boolean sendEmailReminders;

    @Column(name = "create_date")
    private LocalDateTime createDate;

}