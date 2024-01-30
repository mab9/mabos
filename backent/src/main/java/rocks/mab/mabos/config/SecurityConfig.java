package rocks.mab.mabos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import rocks.mab.mabos.constants.SecurityConstants;
import rocks.mab.mabos.filter.CsrfCookieFilter;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {


    // todo improve config with app properties
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:4200"));
        config.setAllowedMethods(List.of("*"));
        config.setAllowedHeaders(List.of("*"));
        // custom header unlike CSRF - inform browser to allow the following header
        config.setExposedHeaders(List.of(SecurityConstants.JWT_HEADER));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http, KeycloakJwtConverter keycloakJwtConverter) throws Exception {

        // default code, only to understand csrf.
        CsrfTokenRequestAttributeHandler requestHandler = new CsrfTokenRequestAttributeHandler();
        requestHandler.setCsrfRequestAttributeName("_csrf");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(keycloakJwtConverter);

        http
                // No more JSESSIONID - we go stateless
                .sessionManagement(securityConfigurer -> securityConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(corsConfigure -> corsConfigure.configurationSource(corsConfigurationSource()))

                // A CsrfTokenRepository that persists the CSRF token in a cookie named
                // "XSRF-TOKEN" and reads from the header "X-XSRF-TOKEN" following the conventions of AngularJS.
                .csrf(csrfConfigurer -> {
                    csrfConfigurer.csrfTokenRequestHandler(requestHandler);
                    // http only false, damit angular via javascript das Cookie auslesen kann.
                    csrfConfigurer.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
                    // public APIS welche PUT / POST änderungen zulassen sollen!
                    csrfConfigurer.csrfTokenRequestHandler(requestHandler).ignoringRequestMatchers("/contact", "/home");
                })

                // Nach Basic auth login, denn erst anschliessend soll das CSRF Cookie an die Response angehängt werden.
                // Spring security fügt selber das Cookie in die Response hinzu, sobald der CSRF Header gesetzt ist.
                .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)

                // Endpoint access
                .authorizeHttpRequests(requests -> {
                            // protected

                            // The way to read this is "if the request is /abos or some subdirectory, require the USER, ADMIN authority; otherwise, only require authentication"
                            requests.requestMatchers( "/abos/**").hasAnyRole("USER", "ADMIN");
                            requests.requestMatchers( "/user/**").hasAnyRole("USER", "ADMIN");

                            // public
                            requests.requestMatchers( "/contact/**").permitAll();
                            requests.requestMatchers( "/swagger-ui/index.html", "/swagger-ui/**", "/api-docs", "/api-docs/**").permitAll();

                            requests.anyRequest().authenticated();

                        }
                )


                // JWT Keycloak
                .oauth2ResourceServer(configurer  -> {
                    configurer.jwt(customizer -> {
                        customizer.jwtAuthenticationConverter(jwtAuthenticationConverter);
                    });
                });
        return http.build();
    }
}