import { get, post, put, del } from '../basicMethodsAPI';

export const dashboardMetricasAPI = {
    
    getAll: async () => {

        var response = await get("/urlTeste");
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