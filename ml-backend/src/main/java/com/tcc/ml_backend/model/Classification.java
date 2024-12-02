package com.tcc.ml_backend.model;

import java.util.Map;

public class Classification {
    private Map<String, Mode> classifiers; // Classificadores como GNB, KNN, etc.

    // Getters e Setters
    public Map<String, Mode> getClassifiers() {
        return classifiers;
    }

    public void setClassifiers(Map<String, Mode> classifiers) {
        this.classifiers = classifiers;
    }
}
