package com.tcc.ml_backend.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Map;

@Repository
public class ModeloDeDadosRepository {

    private final MongoTemplate mongoTemplate;

    public ModeloDeDadosRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    /**
     * Método para buscar as informações de um modelo específico e tipo de ataque.
     *
     * @param modelo     Nome do modelo (ex.: GNB, KNN).
     * @param tipoAtaque Tipo de ataque (ex.: Normal, Backdoor).
     * @return Map com as informações do modelo e ataque.
     */

    public Map findMetricsByModelAndAttack(String modelo, String tipoAtaque) {
        Query query = new Query();
        query.fields().include("class." + modelo + ".normal.class_report." + tipoAtaque);

        // Certifique-se de que "statistics" é o nome correto da sua coleção
        return mongoTemplate.findOne(query, Map.class, "statistics");
    }

    public Map findMetricsByModelAndPCA(String modelo, String tipoAtaque) {
        Query query = new Query();
        query.fields().include("class." + modelo + ".pca.class_report." + tipoAtaque);

        return mongoTemplate.findOne(query, Map.class, "statistics");
    }


}
