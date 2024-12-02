package com.tcc.ml_backend.model;

import java.util.Map;

public class FeatureMetrics {
    private Map<String, Double> topFeatures;
    private Map<String, ReportMetrics> classReport;

    public FeatureMetrics() {}

    public Map<String, Double> getTopFeatures() {
        return topFeatures;
    }

    public void setTopFeatures(Map<String, Double> topFeatures) {
        this.topFeatures = topFeatures;
    }

    public Map<String, ReportMetrics> getClassReport() {
        return classReport;
    }

    public void setClassReport(Map<String, ReportMetrics> classReport) {
        this.classReport = classReport;
    }
}
