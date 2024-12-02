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

    public Map getBinaryMetricsByModelAndValue(String modelo, int valor) {
        return repository.findMetricsByBinaryModelAndValue(modelo, valor);
    }

    /**
     * Soma o total de ataques para um modelo específico.
     */
    public int getTotalAttacks(String modelo) {
        return repository.sumAllAttacks(modelo);
    }

    /**
     * Soma o total de não ataques para um modelo específico.
     */
    public int getTotalNonAttacks(String modelo) {
        return repository.sumAllNonAttacks(modelo);
    }

    /**
     * Calcula a distribuição de ataques por tipo para um modelo específico.
     */
    public Map<String, Double> getAttackDistribution(String modelo) {
        return repository.attackDistributionByModel(modelo);
    }

    /**
     * Calcula a precisão média para um modelo específico.
     */
    public double getAveragePrecision(String modelo) {
        return repository.averagePrecisionByModel(modelo);
    }

}
