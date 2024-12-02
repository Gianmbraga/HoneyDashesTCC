package com.tcc.ml_backend.controller;

import com.tcc.ml_backend.model.Metrics;
import com.tcc.ml_backend.service.MetricService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/metrics")
public class MetricController {

    @Autowired
    private MetricService metricService;

    /**
     * Retorna o relatório de classificação para um modelo e ataque específico.
     *
     * @param model Nome do modelo (e.g., GNB, KNN)
     * @param attack Nome do ataque (e.g., Analysis, Backdoor)
     * @return Metrics
     */
    @GetMapping("/class-report/{model}/{attack}")
    public Optional<Metrics> getClassReportByModelAndAttack(
            @PathVariable String model,
            @PathVariable String attack) {
        return metricService.getClassReportByModelAndAttack(model, attack);
    }

    /**
     * Retorna o relatório de classificação PCA para um modelo e ataque específico.
     *
     * @param model Nome do modelo (e.g., GNB, KNN)
     * @param attack Nome do ataque (e.g., Analysis, Backdoor)
     * @return Metrics
     */
    @GetMapping("/pca-class-report/{model}/{attack}")
    public ResponseEntity<?> getPcaClassReport(
            @PathVariable String model,
            @PathVariable String attack) {
        Optional<Map<String, Object>> result = metricService.getPcaClassReportByModelAndAttack(model, attack);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Data not found");
    }

}
