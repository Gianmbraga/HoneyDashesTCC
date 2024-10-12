package com.tcc.ml_backend.model;

import java.time.LocalDateTime;

public class ClassifierResult {
    private String id;
    private String attackId;
    private String classifierName;
    private String result;
    private double confidenceScore;
    private LocalDateTime classifiedAt;

    // Construtores
    public ClassifierResult(String id, String attackId, String classifierName, String result, double confidenceScore, LocalDateTime classifiedAt) {
        this.id = id;
        this.attackId = attackId;
        this.classifierName = classifierName;
        this.result = result;
        this.confidenceScore = confidenceScore;
        this.classifiedAt = classifiedAt;
    }

    // Getters e Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getAttackId() { return attackId; }
    public void setAttackId(String attackId) { this.attackId = attackId; }

    public String getClassifierName() { return classifierName; }
    public void setClassifierName(String classifierName) { this.classifierName = classifierName; }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }

    public double getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(double confidenceScore) { this.confidenceScore = confidenceScore; }

    public LocalDateTime getClassifiedAt() { return classifiedAt; }
    public void setClassifiedAt(LocalDateTime classifiedAt) { this.classifiedAt = classifiedAt; }
}
