package com.tcc.ml_backend.service;

import com.tcc.ml_backend.model.CyberAttack;
import com.tcc.ml_backend.model.ClassifierResult;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Profile("prod")  // Ativado apenas no perfil de produção
public class ClassifierApiService implements ClassifierStrategy {

    private final RestTemplate restTemplate;

    public ClassifierApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public ClassifierResult classify(CyberAttack attack) {
        return restTemplate.postForObject("http://external-classifier-api/classify", attack, ClassifierResult.class);
    }
}
