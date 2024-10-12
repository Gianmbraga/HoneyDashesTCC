package com.tcc.ml_backend.service;

import com.tcc.ml_backend.model.CyberAttack;
import com.tcc.ml_backend.model.ClassifierResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassifierService {

    private final CsvReaderService csvReaderService;
    private final ClassifierApiService classifierApiService;

    @Autowired
    public ClassifierService(CsvReaderService csvReaderService, ClassifierApiService classifierApiService) {
        this.csvReaderService = csvReaderService;
        this.classifierApiService = classifierApiService;
    }

    public List<ClassifierResult> classifyFromCsv(String csvFileName) {
        // Log para indicar início do processo
        System.out.println("Iniciando classificação a partir do CSV: " + csvFileName);

        // 1. Ler o CSV e obter os ataques
        List<CyberAttack> attacks = csvReaderService.readCsvFile(csvFileName);
        System.out.println("Número de ataques lidos: " + attacks.size());

        // 2. Enviar os ataques para o classificador externo e obter os resultados
        List<ClassifierResult> results = classifierApiService.sendAttacksToClassifier(attacks);
        System.out.println("Número de resultados recebidos: " + results.size());

        return results;
    }
}

