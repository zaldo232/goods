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

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtUtil jwtUtil;

    public SecurityConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configure(http))  // 🔥 CORS 활성화 추가
                .csrf(csrf -> csrf.disable())  // CSRF 보안 해제 (API 요청 필요)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/signup", "/api/auth/login").permitAll()
                        .requestMatchers("/api/products/add").permitAll()
                        .requestMatchers("/api/products").permitAll()
                        .requestMatchers("/api/products/{id}").permitAll()
                        .requestMatchers("/uploads/**").permitAll()
                        .requestMatchers("/api/products/**").authenticated()
                        .requestMatchers("/api/user/me").authenticated()
                        .requestMatchers("/api/user/change-password").authenticated()
                        .requestMatchers("/api/user/delete").authenticated()
                        .requestMatchers("/api/reviews/product/**").permitAll()
                        .requestMatchers("/api/wishlist/**").authenticated()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}