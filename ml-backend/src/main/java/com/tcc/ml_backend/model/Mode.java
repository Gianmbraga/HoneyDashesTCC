package com.tcc.ml_backend.model;

import java.util.Map;

public class Mode {
    private Map<String, Double> topFeatures; // Campos de "top_features"
    private ClassReport classReport;        // Campos de "class_report"

    // Getters e Setters
    public Map<String, Double> getTopFeatures() {
        return topFeatures;
    }

    public void setTopFeatures(Map<String, Double> topFeatures) {
        this.topFeatures = topFeatures;
    }

    public ClassReport getClassReport() {
        return classReport;
    }

    public void setClassReport(ClassReport classReport) {
        this.classReport = classReport;
    }
}
