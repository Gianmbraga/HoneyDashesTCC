package com.tcc.ml_backend.repository;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

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

    public Map findTopFeaturesByModel(String modelo) {
        Query query = new Query();
        query.fields().include("class." + modelo + ".normal.top_features");
        return mongoTemplate.findOne(query, Map.class, "statistics");
    }

    public Map findBinaryTopFeaturesByModel(String modelo) {
        Query query = new Query();
        query.fields().include("binary." + modelo + ".normal.top_features");
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

    public double weightedAvgPrecisionByModel(String modelo) {
        // Define a query que inclui apenas a hierarquia necessária
        Query query = new Query();
        query.fields().include("binary." + modelo + ".normal.class_report.weighted avg");

        // Realiza a busca no MongoDB
        Map result = mongoTemplate.findOne(query, Map.class, "statistics");

        // Extrai o valor de precision do weighted avg, se existir
        if (result != null) {
            Map<?, ?> binary = (Map<?, ?>) result.get("binary");
            if (binary != null) {
                Map<?, ?> modelData = (Map<?, ?>) binary.get(modelo);
                if (modelData != null) {
                    Map<?, ?> normal = (Map<?, ?>) modelData.get("normal");
                    if (normal != null) {
                        Map<?, ?> classReport = (Map<?, ?>) normal.get("class_report");
                        if (classReport != null) {
                            Map<?, ?> weightedAvg = (Map<?, ?>) classReport.get("weighted avg");
                            if (weightedAvg != null) {
                                Object precision = weightedAvg.get("precision");
                                if (precision instanceof Double) {
                                    return (Double) precision;
                                } else if (precision instanceof Integer) {
                                    return ((Integer) precision).doubleValue();
                                }
                            }
                        }
                    }
                }
            }
        }
        // Retorna 0 se nenhum valor válido for encontrado
        return 0;
    }

    public double weightedAvgPrecisionByModelClass(String modelo) {
        // Define a query que inclui apenas a hierarquia necessária
        Query query = new Query();
        query.fields().include("class." + modelo + ".normal.class_report.weighted avg");

        // Realiza a busca no MongoDB
        Map result = mongoTemplate.findOne(query, Map.class, "statistics");

        // Extrai o valor de precision do weighted avg, se existir
        if (result != null) {
            Map<?, ?> binary = (Map<?, ?>) result.get("class");
            if (binary != null) {
                Map<?, ?> modelData = (Map<?, ?>) binary.get(modelo);
                if (modelData != null) {
                    Map<?, ?> normal = (Map<?, ?>) modelData.get("normal");
                    if (normal != null) {
                        Map<?, ?> classReport = (Map<?, ?>) normal.get("class_report");
                        if (classReport != null) {
                            Map<?, ?> weightedAvg = (Map<?, ?>) classReport.get("weighted avg");
                            if (weightedAvg != null) {
                                Object precision = weightedAvg.get("precision");
                                if (precision instanceof Double) {
                                    return (Double) precision;
                                } else if (precision instanceof Integer) {
                                    return ((Integer) precision).doubleValue();
                                }
                            }
                        }
                    }
                }
            }
        }
        // Retorna 0 se nenhum valor válido for encontrado
        return 0;
    }

    public Double getAccuracyByModelClass(String modelo) {
        Query query = new Query();
        query.fields().include("class." + modelo + ".normal.class_report.accuracy");

        Map result = mongoTemplate.findOne(query, Map.class, "statistics");

        if (result != null) {
            Map<?, ?> binary = (Map<?, ?>) result.get("class");
            if (binary != null) {
                Map<?, ?> modelData = (Map<?, ?>) binary.get(modelo);
                if (modelData != null) {
                    Map<?, ?> normal = (Map<?, ?>) modelData.get("normal");
                    if (normal != null) {
                        Map<?, ?> classReport = (Map<?, ?>) normal.get("class_report");
                        if (classReport != null) {
                            Object accuracyValue = classReport.get("accuracy");
                            // Verifica o tipo e converte para Double
                            if (accuracyValue instanceof Integer) {
                                return ((Integer) accuracyValue).doubleValue();
                            } else if (accuracyValue instanceof Double) {
                                return (Double) accuracyValue;
                            }
                        }
                    }
                }
            }
        }
        return null; // Retorna null se não encontrar o dado
    }


    public Double getAccuracyByModel(String modelo) {
        Query query = new Query();
        query.fields().include("binary." + modelo + ".normal.class_report.accuracy");

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
                            Object accuracyValue = classReport.get("accuracy");
                            // Verifica o tipo e converte para Double
                            if (accuracyValue instanceof Integer) {
                                return ((Integer) accuracyValue).doubleValue();
                            } else if (accuracyValue instanceof Double) {
                                return (Double) accuracyValue;
                            }
                        }
                    }
                }
            }
        }
        return null; // Retorna null se não encontrar o dado
    }

    public Map<String, Integer> getSupportValuesByModel(String modelo) {
        // Cria a query para incluir apenas os dados necessários
        Query query = new Query();
        query.fields().include("class." + modelo + ".normal.class_report");

        // Busca o documento no MongoDB
        Map result = mongoTemplate.findOne(query, Map.class, "statistics");

        // Validações de existência de dados
        if (result != null) {
            Map<?, ?> classData = (Map<?, ?>) result.get("class");
            if (classData != null) {
                Map<?, ?> modelData = (Map<?, ?>) classData.get(modelo);
                if (modelData != null) {
                    Map<?, ?> normalData = (Map<?, ?>) modelData.get("normal");
                    if (normalData != null) {
                        Map<?, ?> classReport = (Map<?, ?>) normalData.get("class_report");
                        if (classReport != null) {
                            Map<String, Integer> supportValues = new HashMap<>();

                            // Itera sobre os tipos de ataque para pegar os valores de support
                            for (Map.Entry<?, ?> entry : classReport.entrySet()) {
                                String attackType = (String) entry.getKey();
                                Object value = entry.getValue();
                                if (value instanceof Map) {
                                    Object support = ((Map<?, ?>) value).get("support");
                                    if (support instanceof Integer) {
                                        supportValues.put(attackType, (Integer) support);
                                    }
                                }
                            }

                            return supportValues;
                        }
                    }
                }
            }
        }

        // Retorna um mapa vazio caso nenhum dado seja encontrado
        return Collections.emptyMap();
    }
}
