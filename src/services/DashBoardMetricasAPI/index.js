import { get, post, put, del } from '../basicMethodsAPI';

export const dashboardMetricasAPI = {
    

    //TOTAL ATTACKS
    getAllAttacks: async (param) => {
        var response = await get(`metrics/attacks/total?modelo=${param}`);
        return response;
    },

    //TOTAL NO ATTACKS
    getAllNotAttacks: async (param) => {

        var response = await get(`metrics/nonattacks/total?modelo=${param}`);
        return response;
    },

    getAccuracyNormal: async (algoritmo) => {

        var response = await get(`/metrics/accuracyClass?modelo=${algoritmo}`);
        return response;
    },

    getPrecisaoNormal: async (algoritmo) => {

        var response = await get(`metrics/precision/weightedClass?modelo=${algoritmo}`);
        return response;
    },

    getAccuracyBinario: async (algoritmo) => {

        var response = await get(`/metrics/accuracy?modelo=${algoritmo}`);
        return response;
    },
    
    getPrecisaoBinario: async (algoritmo) => {

        var response = await get(`/metrics/precision/weighted?modelo=${algoritmo}`);
        return response;
    },


    //PEGAR ACURACIA
    getAccuracy: async (algoritmo) => {

        var response = await get(`/metrics/accuracy?modelo=${algoritmo}`);
        return response;
    },

    //PEGAR MEDIA DE PRECISAO
    getPrecisionAverage: async (algoritmo) => {

        var response = await get(`metrics/precision/average?modelo=${algoritmo}`);
        return response;
    },

    //Resultados binarios
    getBinaryMetrics: async (algoritmo, valor) => {

        var response = await get(`metrics/binary?modelo=${algoritmo}&valor=${valor}`);
        return response;
    },

    //uso de pca
    getPcaMetrics: async (algoritmo, tipo) => {

        var response = await get(`metrics/pca?modelo=${algoritmo}&tipoAtaque=${tipo}`);
        return response;
    },

    getMetricaEspecificas: async (algoritmo, tipo) => {

        var response = await get(`metrics?modelo=${algoritmo}&tipoAtaque=${tipo}`);
        return response;
    },

    getTopFeaturesNormal: async (algoritmo) => {

        var response = await get(`metrics/top-features?modelo=${algoritmo}`);
        return response;
    },

    getTopFeaturesBinario: async (algoritmo) => {
        const response = await get(`metrics/binary/top-features?modelo=${encodeURIComponent(algoritmo)}`);
        return response;
    },


    getAllMetricas: async (algoritmo) => {
        const response = await get(`metrics/support?modelo=${algoritmo}`);
        return response;
    },
    



    
    













    // updateSenhaPopup: async (login, oldPassword, senha) => {
    //     var requestPassword ={
    //         login: login,
    //         oldPassword: oldPassword,
    //         senha: senha
    //     }
    //     var responsePassword = await post("/", requestPassword)
    //     return responsePassword;
    // }
}