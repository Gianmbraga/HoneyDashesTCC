package com.tcc.ml_backend.repository;

import com.tcc.ml_backend.model.Metrics;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Map;
import java.util.Optional;

public interface MetricsRepository extends MongoRepository<Metrics, String> {

    /**
     * Consulta o relatório de classificação para um modelo específico e um tipo de ataque específico.
     *
     * @param model Nome do modelo (e.g., GNB, KNN)
     * @param attack Nome do tipo de ataque (e.g., Analysis, Backdoor)
     * @return Dados do relatório de classificação
     */
    @Query("{ 'class.?0.normal.class_report.?1': { $exists: true } }")
    Optional<Metrics> findClassReportByModelAndAttack(String model, String attack);

    /**
     * Consulta o relatório de classificação para PCA em um modelo específico e tipo de ataque específico.
     *
     * @param model Nome do modelo (e.g., GNB, KNN)
     * @param attack Nome do tipo de ataque (e.g., Analysis, Backdoor)
     * @return Dados do relatório de classificação
     */
    @Query("{ 'class.?0.pca.class_report.?1': { $exists: true } }")
    Optional<Map<String, Object>> findPcaClassReportByModelAndAttack(String model, String attack);

}
