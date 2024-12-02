package com.tcc.ml_backend.model;

import java.util.Map;

public class ClassReport {
    private Map<String, ReportMetrics> reports; // Relatórios por classe, como "Analysis", "Backdoor", etc.
    private double accuracy;                    // Campo "accuracy"
    private ReportMetrics macroAvg;            // Campo "macro avg"
    private ReportMetrics weightedAvg;         // Campo "weighted avg"

    // Getters e Setters
    public Map<String, ReportMetrics> getReports() {
        return reports;
    }

    public void setReports(Map<String, ReportMetrics> reports) {
        this.reports = reports;
    }

    public double getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(double accuracy) {
        this.accuracy = accuracy;
    }

    public ReportMetrics getMacroAvg() {
        return macroAvg;
    }

    public void setMacroAvg(ReportMetrics macroAvg) {
        this.macroAvg = macroAvg;
    }

    public ReportMetrics getWeightedAvg() {
        return weightedAvg;
    }

    public void setWeightedAvg(ReportMetrics weightedAvg) {
        this.weightedAvg = weightedAvg;
    }
}
