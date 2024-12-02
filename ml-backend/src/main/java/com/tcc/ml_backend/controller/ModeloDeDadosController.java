package com.tcc.ml_backend.controller;

import com.tcc.ml_backend.service.ModeloDeDadosService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ModeloDeDadosController {

    private final ModeloDeDadosService service;

    public ModeloDeDadosController(ModeloDeDadosService service) {
        this.service = service;
    }

    /**
     * Endpoint para buscar métricas com base no modelo e tipo de ataque.
     *
     * @param modelo     Nome do modelo (ex.: GNB, KNN).
     * @param tipoAtaque Tipo de ataque (ex.: Normal, Backdoor).
     * @return Map com as informações do modelo e ataque.
     */
    @GetMapping("/metrics")
    public Map getMetrics(@RequestParam String modelo, @RequestParam String tipoAtaque) {
        return service.getMetricsByModelAndAttack(modelo, tipoAtaque);
    }

    @GetMapping("/metrics/pca")
    public Map getPCAMetrics(@RequestParam String modelo, @RequestParam String tipoAtaque) {
        return service.getMetricsByModelAndPCA(modelo, tipoAtaque);
    }

    @GetMapping("/metrics/binary")
    public Map getBinaryMetrics(@RequestParam String modelo, @RequestParam int valor) {
        return service.getBinaryMetricsByModelAndValue(modelo, valor);
    }

    /**
     * Endpoint para obter o total de ataques.
     */
    @GetMapping("/metrics/attacks/total")
    public int getTotalAttacks(@RequestParam String modelo) {
        return service.getTotalAttacks(modelo);
    }

    /**
     * Endpoint para obter o total de não ataques.
     */
    @GetMapping("/metrics/nonattacks/total")
    public int getTotalNonAttacks(@RequestParam String modelo) {
        return service.getTotalNonAttacks(modelo);
    }

    /**
     * Endpoint para obter a distribuição de ataques por tipo.
     */
    @GetMapping("/metrics/attacks/distribution")
    public Map<String, Double> getAttackDistribution(@RequestParam String modelo) {
        return service.getAttackDistribution(modelo);
    }

    /**
     * Endpoint para obter a precisão média do modelo.
     */
    @GetMapping("/metrics/precision/average")
    public double getAveragePrecision(@RequestParam String modelo) {
        return service.getAveragePrecision(modelo);
    }


}
