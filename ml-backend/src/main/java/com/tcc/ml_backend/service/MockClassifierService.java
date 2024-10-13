package com.tcc.ml_backend.service;

import com.tcc.ml_backend.model.CyberAttack;
import com.tcc.ml_backend.model.ClassifierResult;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Profile("dev")  // Ativado apenas no perfil de desenvolvimento
public class MockClassifierService implements ClassifierStrategy {

    @Override
    public ClassifierResult classify(CyberAttack attack) {
        return new ClassifierResult(
                attack.getId(),
                attack.getId(),
                "Mock Classifier",  // Nome do classificador simulado
                "benign",  // Resultado fictício
                0.95,  // Confiança simulada
                LocalDateTime.now()
        );
    }
}
