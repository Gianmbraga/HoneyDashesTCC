package com.tcc.ml_backend.model;

public class ClassMetrics {
    private ModelMetrics GNB;
    private ModelMetrics KNN;
    private ModelMetrics RandomForest;
    private ModelMetrics SVM;

    public ClassMetrics() {}

    public ModelMetrics getGNB() {
        return GNB;
    }

    public void setGNB(ModelMetrics GNB) {
        this.GNB = GNB;
    }

    public ModelMetrics getKNN() {
        return KNN;
    }

    public void setKNN(ModelMetrics KNN) {
        this.KNN = KNN;
    }

    public ModelMetrics getRandomForest() {
        return RandomForest;
    }

    public void setRandomForest(ModelMetrics RandomForest) {
        this.RandomForest = RandomForest;
    }

    public ModelMetrics getSVM() {
        return SVM;
    }

    public void setSVM(ModelMetrics SVM) {
        this.SVM = SVM;
    }
}
