package com.tcc.ml_backend.model;

import java.util.Map;

public class MetricDetails {

    private Map<String, Double> topFeatures;

    private Map<String, ClassReport> classReport;

    // Getters e Setters
    public Map<String, Double> getTopFeatures() {
        return topFeatures;
    }

    public void setTopFeatures(Map<String, Double> topFeatures) {
        this.topFeatures = topFeatures;
    }

    public Map<String, ClassReport> getClassReport() {
        return classReport;
    }

    public void setClassReport(Map<String, ClassReport> classReport) {
        this.classReport = classReport;
    }
}
