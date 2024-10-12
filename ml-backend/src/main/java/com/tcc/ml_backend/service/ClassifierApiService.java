package com.tcc.ml_backend.service;

import com.tcc.ml_backend.model.CyberAttack;
import com.tcc.ml_backend.model.ClassifierResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class ClassifierApiService {

    private final RestTemplate restTemplate;
    private final String classifierApiUrl;

    @Autowired
    public ClassifierApiService(RestTemplate restTemplate, @Value("${classifier.api.url}") String classifierApiUrl) {
        this.restTemplate = restTemplate;
        this.classifierApiUrl = classifierApiUrl;
    }

    public List<ClassifierResult> sendAttacksToClassifier(List<CyberAttack> attacks) {
        // Enviar a lista de CyberAttack para a API externa
        ResponseEntity<ClassifierResult[]> response = restTemplate.postForEntity(classifierApiUrl, attacks, ClassifierResult[].class);

        return Arrays.asList(response.getBody());
    }
}

