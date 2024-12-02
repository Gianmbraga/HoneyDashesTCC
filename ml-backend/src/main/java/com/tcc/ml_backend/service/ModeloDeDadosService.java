package com.tcc.ml_backend.service;

import com.tcc.ml_backend.repository.ModeloDeDadosRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ModeloDeDadosService {

    private final ModeloDeDadosRepository repository;

    public ModeloDeDadosService(ModeloDeDadosRepository repository) {
        this.repository = repository;
    }

    /**
     * Consulta métricas com base no modelo e tipo de ataque.
     *
     * @param modelo     Nome do modelo (ex.: GNB, KNN).
     * @param tipoAtaque Tipo de ataque (ex.: Normal, Backdoor).
     * @return Map com as informações do modelo e ataque.
     */
    public Map getMetricsByModelAndAttack(String modelo, String tipoAtaque) {
        return repository.findMetricsByModelAndAttack(modelo, tipoAtaque);
    }

    public Map getMetricsByModelAndPCA(String modelo, String tipoAtaque) {
        return repository.findMetricsByModelAndPCA(modelo, tipoAtaque);
    }

}
