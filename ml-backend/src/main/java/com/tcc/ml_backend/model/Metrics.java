package com.tcc.ml_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "statistics")
public class Metrics {

    @Id
    private String id; // ID do documento

    private Classification classData; // Dados da seção "class"
    private Classification binary;    // Dados da seção "binary"

    // Getters e Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Classification getClassData() {
        return classData;
    }

    public void setClassData(Classification classData) {
        this.classData = classData;
    }

    public Classification getBinary() {
        return binary;
    }

    public void setBinary(Classification binary) {
        this.binary = binary;
    }
}
