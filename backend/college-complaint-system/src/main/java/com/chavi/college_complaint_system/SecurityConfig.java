package com.chavi.college_complaint_system;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        // Login & Register open
                        .requestMatchers("/api/students/login", "/api/students/register").permitAll()
                        .requestMatchers("/api/admins/login").permitAll()

                        // Complaints & other routes also open (for now, until JWT is added)
                        .requestMatchers("/api/complaints/**").permitAll()
                        .requestMatchers("/api/students/**").permitAll()
                        .requestMatchers("/api/admins/**").permitAll()

                        // Block everything else (optional)
                        .anyRequest().denyAll()
                )
                .csrf(csrf -> csrf.disable());

        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
