package com.tcc.ml_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true); // Permitir credenciais
        config.addAllowedOriginPattern("*"); // Permitir todas as origens
        config.addAllowedHeader("*"); // Permitir todos os cabeçalhos
        config.addAllowedMethod("*"); // Permitir todos os métodos (GET, POST, PUT, DELETE, OPTIONS)
        config.setMaxAge(3600L); // Cache das permissões por 1 hora

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
