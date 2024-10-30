import axios from 'axios';
// import { storage } from '../utils/StorageHelper';

const mountHeader = async () => {
    return {
        'cache-control': "no-cache",
        'Transfer-Encoding': "chunked",
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': "*/*",
        'Access-Control-Allow-Origin': "*",
        // 'Authorization': `Bearer ${storage.getToken()}`
    };
};

const apiUrl = process.env.REACT_APP_API_URL;

// Função para requisição POST
export const post = async (url, data) => {
    let result = null;
    if (process.env.NODE_ENV === "development") console.log(apiUrl + url);

    try {
        const response = await axios.post(
            apiUrl + url,
            data,
            {
                headers: await mountHeader(),
                timeout: 15000
            }
        );

        result = {
            success: true,
            data: response.data,
            message: null
        };
    } catch (e) {
        result = {
            success: false,
            data: null,
            message: e
        };
    }

    return result;
};

// Função para requisição PUT
export const put = async (url, data) => {
    let result = null;
    if (process.env.NODE_ENV === "development") console.log(apiUrl + url);

    try {
        const response = await axios.put(
            apiUrl + url,
            data,
            {
                headers: await mountHeader(),
                timeout: 15000
            }
        );

        result = {
            success: true,
            data: response.data,
            message: null
        };
    } catch (e) {
        result = {
            success: false,
            data: null,
            message: e
        };
    }

    return result;
};

// Função para requisição DELETE
export const del = async (url, data) => {
    let result = null;
    if (process.env.NODE_ENV === "development") console.log(apiUrl + url);

    try {
        const response = await axios.delete(
            apiUrl + url,
            {
                data: data,
                headers: await mountHeader()
            }
        );

        result = {
            success: true,
            data: response.data,
            message: null
        };
    } catch (e) {
        result = {
            success: false,
            data: null,
            message: e
        };
    }

    return result;
};

// Função para requisição GET
export const get = async (url) => {
    let result = null;
    try {
        const response = await axios.get(
            apiUrl + url,
            {
                headers: await mountHeader(),
                timeout: 15000
            }
        );

        result = {
            success: true,
            data: response.data,
            message: null
        };
    } catch (e) {
        result = {
            success: false,
            data: null,
            message: e
        };
    }

    return result;
};
