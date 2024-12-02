package com.tcc.ml_backend.model;

public class ModelMetrics {
    private FeatureMetrics normal;
    private FeatureMetrics pca;

    public ModelMetrics() {}

    public FeatureMetrics getNormal() {
        return normal;
    }

    public void setNormal(FeatureMetrics normal) {
        this.normal = normal;
    }

    public FeatureMetrics getPca() {
        return pca;
    }

    public void setPca(FeatureMetrics pca) {
        this.pca = pca;
    }
}
