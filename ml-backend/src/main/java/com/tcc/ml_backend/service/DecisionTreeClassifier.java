package com.tcc.ml_backend.service;

import com.tcc.ml_backend.model.CyberAttack;
import com.tcc.ml_backend.model.ClassifierResult;

import java.time.LocalDateTime;

public class DecisionTreeClassifier implements ClassifierStrategy {

    @Override
    public ClassifierResult classify(CyberAttack attack) {
        // Lógica de classificação com árvore de decisão (exemplo simplificado)
        String result = "normal"; // Resultado fictício
        double confidenceScore = 0.85; // Confiança fictícia

        return new ClassifierResult(
                attack.getId(),
                attack.getId(),
                "Decision Tree",
                result,
                confidenceScore,
                LocalDateTime.now()
        );
    }
}
