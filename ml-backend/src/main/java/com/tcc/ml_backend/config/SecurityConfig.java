//package com.tcc.ml_backend.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable()) // Desabilitar CSRF
//                .authorizeHttpRequests(auth -> auth
//                        .anyRequest().permitAll() // Permitir acesso irrestrito
//                )
//                .formLogin(form -> form.disable()) // Desabilitar login via formulário
//                .httpBasic(httpBasic -> httpBasic.disable()); // Desabilitar autenticação HTTP Basic
//
//        return http.build();
//    }
//}

