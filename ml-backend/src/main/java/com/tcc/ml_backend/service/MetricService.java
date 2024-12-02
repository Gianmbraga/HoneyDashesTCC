package com.tcc.ml_backend.service;

import com.tcc.ml_backend.model.Metrics;
import com.tcc.ml_backend.repository.MetricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class MetricService {

    @Autowired
    private MetricsRepository metricsRepository;

    /**
     * Retorna o relatório de classificação para um modelo e ataque específico.
     *
     * @param model Nome do modelo (e.g., GNB, KNN)
     * @param attack Nome do ataque (e.g., Analysis, Backdoor)
     * @return Optional<Metrics>
     */
    public Optional<Metrics> getClassReportByModelAndAttack(String model, String attack) {
        return metricsRepository.findClassReportByModelAndAttack(model, attack);
    }

    /**
     * Retorna o relatório de classificação PCA para um modelo e ataque específico.
     *
     * @param model Nome do modelo (e.g., GNB, KNN)
     * @param attack Nome do ataque (e.g., Analysis, Backdoor)
     * @return Optional<Metrics>
     */
    public Optional<Map<String, Object>> getPcaClassReportByModelAndAttack(String model, String attack) {
        return metricsRepository.findPcaClassReportByModelAndAttack(model, attack);
    }

}
