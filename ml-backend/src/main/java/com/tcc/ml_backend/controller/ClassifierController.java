package com.tcc.ml_backend.controller;

import com.tcc.ml_backend.model.ClassifierResult;
import com.tcc.ml_backend.service.ClassifierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classify")
public class ClassifierController {

    private final ClassifierService classifierService;

    @Autowired
    public ClassifierController(ClassifierService classifierService) {
        this.classifierService = classifierService;
    }

    @GetMapping("/csv")
    public ResponseEntity<List<ClassifierResult>> classifyCsv() {
        try {
            String fileName = "cyber_attacks.csv"; // Nome do arquivo na pasta resources

            // Classificar os ataques a partir do CSV
            List<ClassifierResult> results = classifierService.classifyFromCsv(fileName);

            // Devolver os resultados como resposta
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build(); // Erro interno
        }
    }
}
