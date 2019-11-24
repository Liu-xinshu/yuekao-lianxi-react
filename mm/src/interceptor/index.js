import axios from 'axios';

let newAxios = axios.create();

newAxios.interceptors.request.use((config) => {
    return {
        ...config,
        headers: {
            ...config.headers,
            token: window.localStorage.token
        }
    };
}, (e) => {
    return Promise.reject(e)
})


newAxios.interceptors.response.use((response) => {
    return response;
}, (e) => {
    return Promise.reject(e)
})

export default newAxios;