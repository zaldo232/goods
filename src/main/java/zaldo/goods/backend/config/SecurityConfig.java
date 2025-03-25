package zaldo.goods.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import zaldo.goods.backend.security.JwtAuthenticationFilter;
import zaldo.goods.backend.repository.AdminRepository;

import zaldo.goods.backend.repository.AdminRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final AdminRepository adminRepository;

    public SecurityConfig(JwtUtil jwtUtil, AdminRepository adminRepository) {
        this.jwtUtil = jwtUtil;
        this.adminRepository = adminRepository;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configure(http))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/signup", "/api/auth/login").permitAll()
                        .requestMatchers("/api/admin/signup", "/api/admin/login").permitAll()
                        .requestMatchers("/api/products/add").permitAll()
                        .requestMatchers("/api/products").permitAll()
                        .requestMatchers("/api/products/{id}").permitAll()
                        .requestMatchers("/uploads/**").permitAll()

                        .requestMatchers("/api/admin/**").hasRole("ADMIN") // ✅ 관리자 권한 필요

                        .requestMatchers("/api/user/me").authenticated()
                        .requestMatchers("/api/user/change-password").authenticated()
                        .requestMatchers("/api/user/delete").authenticated()
                        .requestMatchers("/api/wishlist/**").authenticated()
                        .requestMatchers("/api/reviews/product/**").permitAll()
                        .requestMatchers("/api/products/**").authenticated()

                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtil, adminRepository), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
