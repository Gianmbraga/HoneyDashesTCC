package com.tcc.ml_backend.controller;

import com.tcc.ml_backend.model.ClassifierResult;
import com.tcc.ml_backend.service.ClassifierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api/classify")
public class ClassifierController {

    private final ClassifierService classifierService;

    @Autowired
    public ClassifierController(ClassifierService classifierService) {
        this.classifierService = classifierService;
    }

    /**
     * Endpoint para enviar um arquivo CSV e classificar os ataques.
     *
     * @param file Arquivo CSV enviado via multipart/form-data
     * @return Lista de ClassifierResult com os resultados da classificação
     */
    @PostMapping("/csv")
    public ResponseEntity<List<ClassifierResult>> classifyCsv(@RequestParam("file") MultipartFile file) {
        try {
            // 1. Criar um arquivo temporário no sistema de arquivos
            Path tempDir = Files.createTempDirectory("uploads");
            Path tempFile = tempDir.resolve(file.getOriginalFilename());
            file.transferTo(tempFile);

            // 2. Processar o arquivo CSV e classificar os ataques
            List<ClassifierResult> results = classifierService.classifyFromCsv(tempFile.toString());

            // 3. Retornar os resultados da classificação
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build(); // Erro interno do servidor
        }
    }
}
