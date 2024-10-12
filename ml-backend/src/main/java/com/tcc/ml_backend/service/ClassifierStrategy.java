package com.tcc.ml_backend.service;

import com.tcc.ml_backend.model.CyberAttack;
import com.tcc.ml_backend.model.ClassifierResult;

public interface ClassifierStrategy {
    ClassifierResult classify(CyberAttack attack);
}
