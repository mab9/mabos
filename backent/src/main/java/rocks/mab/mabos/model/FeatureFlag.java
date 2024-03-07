package rocks.mab.mabos.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "feature_flags")
public class FeatureFlag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Note: Using int here is fine for serial columns, but consider using a data type like Long for large values.

    @JsonIgnore // Do not leak user information
    private String userEmail;
    private String feature;
    private boolean flag;
}

