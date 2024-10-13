package com.tcc.ml_backend.service;

import com.tcc.ml_backend.model.CyberAttack;
import com.tcc.ml_backend.model.ClassifierResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassifierService {

    private final CsvReaderService csvReaderService;
    private final ClassifierStrategy classifierStrategy;

    @Autowired
    public ClassifierService(CsvReaderService csvReaderService, ClassifierStrategy classifierStrategy) {
        this.csvReaderService = csvReaderService;
        this.classifierStrategy = classifierStrategy;
    }

    public List<ClassifierResult> classifyFromCsv(String csvFileName) {
        System.out.println("Iniciando classificação a partir do CSV: " + csvFileName);

        // 1. Ler o CSV e obter os ataques
        List<CyberAttack> attacks = csvReaderService.readCsvFile(csvFileName);
        System.out.println("Número de ataques lidos: " + attacks.size());

        // 2. Enviar os ataques para o classificador (real ou mock)
        return attacks.stream()
                .map(attack -> classifierStrategy.classify(attack))
                .collect(Collectors.toList());
    }
}
