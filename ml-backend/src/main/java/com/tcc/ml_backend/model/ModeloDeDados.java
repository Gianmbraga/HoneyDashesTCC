package com.tcc.ml_backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "statistics") // Substitua "suaColecao" pelo nome da sua coleção
public class ModeloDeDados {

    private Classificacao classificacao;

    public Classificacao getClassificacao() {
        return classificacao;
    }

    public void setClassificacao(Classificacao classificacao) {
        this.classificacao = classificacao;
    }

    public static class Classificacao {
        private GNB GNB;
        private KNN KNN;
        private RandomForest RandomForest;
        private SVM SVM;

        public GNB getGNB() {
            return GNB;
        }

        public void setGNB(GNB GNB) {
            this.GNB = GNB;
        }

        public KNN getKNN() {
            return KNN;
        }

        public void setKNN(KNN KNN) {
            this.KNN = KNN;
        }

        public RandomForest getRandomForest() {
            return RandomForest;
        }

        public void setRandomForest(RandomForest RandomForest) {
            this.RandomForest = RandomForest;
        }

        public SVM getSVM() {
            return SVM;
        }

        public void setSVM(SVM SVM) {
            this.SVM = SVM;
        }
    }
}
