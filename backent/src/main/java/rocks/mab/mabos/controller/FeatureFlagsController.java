package rocks.mab.mabos.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import rocks.mab.mabos.model.FeatureFlag;
import rocks.mab.mabos.service.FeatureFlagService;

import java.util.Collection;

@RestController
@RequestMapping(path = "feature-flags")
@RequiredArgsConstructor
public class FeatureFlagsController {

    private final FeatureFlagService featureFlagService;

    @GetMapping
    public Collection<FeatureFlag> getUserAbos() {
        return featureFlagService.getAllMyFeatureFlags();
    }

    @PutMapping("{id}")
    public FeatureFlag update(@PathVariable Long id, @RequestBody FeatureFlag item) {
        return featureFlagService.update(item);
    }
}
