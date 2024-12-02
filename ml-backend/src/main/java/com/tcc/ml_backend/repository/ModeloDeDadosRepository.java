package com.tcc.ml_backend.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Collections;
import java.util.HashMap;
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

    public Map findMetricsByBinaryModelAndValue(String modelo, int valor) {
        Query query = new Query();
        query.fields().include("binary." + modelo + ".normal.class_report." + valor);

        return mongoTemplate.findOne(query, Map.class, "statistics");
    }

    public int sumAllAttacks(String modelo) {
        Query query = new Query();
        query.fields().include("binary." + modelo + ".normal.class_report.1.support");

        Map result = mongoTemplate.findOne(query, Map.class, "statistics");

        if (result != null) {
            Map<?, ?> binary = (Map<?, ?>) result.get("binary");
            if (binary != null) {
                Map<?, ?> modelData = (Map<?, ?>) binary.get(modelo);
                if (modelData != null) {
                    Map<?, ?> normal = (Map<?, ?>) modelData.get("normal");
                    if (normal != null) {
                        Map<?, ?> classReport = (Map<?, ?>) normal.get("class_report");
                        if (classReport != null) {
                            Map<?, ?> attackData = (Map<?, ?>) classReport.get("1");
                            if (attackData != null) {
                                return (int) attackData.get("support");
                            }
                        }
                    }
                }
            }
        }
        return 0;
    }

    public int sumAllNonAttacks(String modelo) {
        Query query = new Query();
        query.fields().include("binary." + modelo + ".normal.class_report.0.support");

        Map result = mongoTemplate.findOne(query, Map.class, "statistics");

        if (result != null) {
            Map<?, ?> binary = (Map<?, ?>) result.get("binary");
            if (binary != null) {
                Map<?, ?> modelData = (Map<?, ?>) binary.get(modelo);
                if (modelData != null) {
                    Map<?, ?> normal = (Map<?, ?>) modelData.get("normal");
                    if (normal != null) {
                        Map<?, ?> classReport = (Map<?, ?>) normal.get("class_report");
                        if (classReport != null) {
                            Map<?, ?> nonAttackData = (Map<?, ?>) classReport.get("0");
                            if (nonAttackData != null) {
                                return (int) nonAttackData.get("support");
                            }
                        }
                    }
                }
            }
        }
        return 0;
    }

    public Map<String, Double> attackDistributionByModel(String modelo) {
        Query query = new Query();
        query.fields().include("binary." + modelo + ".normal.class_report");

        Map result = mongoTemplate.findOne(query, Map.class, "statistics");

        if (result != null) {
            Map<?, ?> binary = (Map<?, ?>) result.get("binary");
            if (binary != null) {
                Map<?, ?> modelData = (Map<?, ?>) binary.get(modelo);
                if (modelData != null) {
                    Map<?, ?> normal = (Map<?, ?>) modelData.get("normal");
                    if (normal != null) {
                        Map<?, ?> classReport = (Map<?, ?>) normal.get("class_report");
                        if (classReport != null) {
                            Map<String, Double> distribution = new HashMap<>();
                            int totalSupport = 0;

                            for (Object value : classReport.values()) {
                                if (value instanceof Map) {
                                    totalSupport += (int) ((Map<?, ?>) value).get("support");
                                }
                            }

                            for (Map.Entry<?, ?> entry : classReport.entrySet()) {
                                String attackType = (String) entry.getKey();
                                Object value = entry.getValue();
                                if (value instanceof Map) {
                                    int support = (int) ((Map<?, ?>) value).get("support");
                                    distribution.put(attackType, (support / (double) totalSupport) * 100);
                                }
                            }
                            return distribution;
                        }
                    }
                }
            }
        }
        return Collections.emptyMap();
    }

    public double averagePrecisionByModel(String modelo) {
        Query query = new Query();
        query.fields().include("binary." + modelo + ".normal.class_report");

        Map<String, Object> result = mongoTemplate.findOne(query, Map.class, "statistics");

        if (result != null) {
            Map<?, ?> binary = (Map<?, ?>) result.get("binary");
            if (binary != null) {
                Map<?, ?> modelData = (Map<?, ?>) binary.get(modelo);
                if (modelData != null) {
                    Map<?, ?> normal = (Map<?, ?>) modelData.get("normal");
                    if (normal != null) {
                        Map<?, ?> classReport = (Map<?, ?>) normal.get("class_report");
                        if (classReport != null) {
                            double totalPrecision = 0;
                            int count = 0;

                            for (Object value : classReport.values()) {
                                if (value instanceof Map) {
                                    Object precision = ((Map<?, ?>) value).get("precision");
                                    if (precision != null) {
                                        // Tratar valores como Double ou Integer
                                        if (precision instanceof Integer) {
                                            totalPrecision += ((Integer) precision).doubleValue();
                                        } else if (precision instanceof Double) {
                                            totalPrecision += (Double) precision;
                                        }
                                        count++;
                                    }
                                }
                            }
                            return count > 0 ? totalPrecision / count : 0;
                        }
                    }
                }
            }
        }
        return 0;
    }

}
