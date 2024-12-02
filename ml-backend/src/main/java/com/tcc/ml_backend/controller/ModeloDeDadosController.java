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
}
