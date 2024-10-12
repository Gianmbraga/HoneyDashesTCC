package com.tcc.ml_backend.model;

import java.time.LocalDateTime;

public class CyberAttack {
    private String id;
    private String attackType;
    private String sourceIp;
    private String destinationIp;
    private LocalDateTime timestamp;

    // Construtores
    public CyberAttack(String id, String attackType, String sourceIp, String destinationIp, LocalDateTime timestamp) {
        this.id = id;
        this.attackType = attackType;
        this.sourceIp = sourceIp;
        this.destinationIp = destinationIp;
        this.timestamp = timestamp;
    }

    // Getters e Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getAttackType() { return attackType; }
    public void setAttackType(String attackType) { this.attackType = attackType; }

    public String getSourceIp() { return sourceIp; }
    public void setSourceIp(String sourceIp) { this.sourceIp = sourceIp; }

    public String getDestinationIp() { return destinationIp; }
    public void setDestinationIp(String destinationIp) { this.destinationIp = destinationIp; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
