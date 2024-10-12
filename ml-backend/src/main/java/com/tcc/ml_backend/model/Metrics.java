package com.tcc.ml_backend.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@RequiredArgsConstructor
public class Metrics {
    private String id;
    private String classifierName;
    private double accuracy;
    private double precision;
    private double recall;
    private LocalDateTime calculatedAt;
}
