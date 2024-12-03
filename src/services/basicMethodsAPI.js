import axios from 'axios';

// Função para montar os headers, caso precise de algo adicional no futuro
const mountHeader = async () => {
    return {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
    };
};

// URL base da API (substitua pelo seu endpoint da AWS, se necessário)
const apiUrl = process.env.REACT_APP_API_URL; // Alterar para URL da AWS em produção

// Criando uma instância do Axios com configuração de autenticação
const api = axios.create({
    baseURL: apiUrl,
    timeout: 15000, // Timeout de 15 segundos
    auth: {
        username: 'admin', // Substitua pelo username configurado no backend
        password: 'admin123', // Substitua pela senha configurada no backend
    },
});

// Função para requisições GET
export const get = async (url) => {
    let result = null;
    try {
        const response = await api.get(url, {
            headers: await mountHeader(),
        });

        result = {
            success: true,
            data: response.data,
            message: null,
        };
    } catch (e) {
        result = {
            success: false,
            data: null,
            message: e.response?.data?.message || e.message || 'Erro desconhecido',
        };
    }

    return result;
};

// Função para requisições POST
export const post = async (url, data) => {
    let result = null;
    try {
        const response = await api.post(url, data, {
            headers: await mountHeader(),
        });

        result = {
            success: true,
            data: response.data,
            message: null,
        };
    } catch (e) {
        result = {
            success: false,
            data: null,
            message: e.response?.data?.message || e.message || 'Erro desconhecido',
        };
    }

    return result;
};

// Função para requisições PUT
export const put = async (url, data) => {
    let result = null;
    try {
        const response = await api.put(url, data, {
            headers: await mountHeader(),
        });

        result = {
            success: true,
            data: response.data,
            message: null,
        };
    } catch (e) {
        result = {
            success: false,
            data: null,
            message: e.response?.data?.message || e.message || 'Erro desconhecido',
        };
    }

    return result;
};

// Função para requisições DELETE
export const del = async (url) => {
    let result = null;
    try {
        const response = await api.delete(url, {
            headers: await mountHeader(),
        });

        result = {
            success: true,
            data: response.data,
            message: null,
        };
    } catch (e) {
        result = {
            success: false,
            data: null,
            message: e.response?.data?.message || e.message || 'Erro desconhecido',
        };
    }

    return result;
};