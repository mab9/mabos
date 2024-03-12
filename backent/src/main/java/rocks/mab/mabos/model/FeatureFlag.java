package rocks.mab.mabos.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Table(name = "feature_flags")
public class FeatureFlag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Note: Using int here is fine for serial columns, but consider using a data type like Long for large values.

    private String feature;

    //@OneToMany(mappedBy = "featureFlag")
    @OneToMany(mappedBy = "featureFlag", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<UsersFeatureFlag> userFeatureFlags;

}

