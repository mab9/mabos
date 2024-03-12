package rocks.mab.mabos.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users_feature_flags")
public class UsersFeatureFlag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feature_flag_id")
    private FeatureFlag featureFlag;

    private boolean isActive;
}

