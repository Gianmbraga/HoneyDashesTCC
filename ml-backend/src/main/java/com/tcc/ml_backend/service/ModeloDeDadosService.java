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
    public Map getTopFeaturesByModel(String modelo) {
        return repository.findTopFeaturesByModel(modelo);
    }

    public Map getBinaryTopFeaturesByModel(String modelo) {
        return repository.findBinaryTopFeaturesByModel(modelo);
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
    //acuracia
    public Double getModelAccuracy(String modelo) {
        Double accuracy = repository.getAccuracyByModel(modelo);
        if (accuracy == null) {
            throw new IllegalArgumentException("Modelo não encontrado ou acurácia indisponível: " + modelo);
        }
        return accuracy;
    }

    /**
     * Calcula a precisão média para um modelo específico.
     */
    public double getAveragePrecision(String modelo) {
        return repository.averagePrecisionByModel(modelo);
    }

}
