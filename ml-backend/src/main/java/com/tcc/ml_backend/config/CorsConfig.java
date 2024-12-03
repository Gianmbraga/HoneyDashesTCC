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

        config.setAllowCredentials(false); // Não precisa de credenciais
        config.addAllowedOriginPattern("*"); // Permitir qualquer origem
        config.addAllowedHeader("*"); // Permitir qualquer cabeçalho
        config.addAllowedMethod("*"); // Permitir qualquer método

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
