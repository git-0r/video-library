const axios = require("axios");

const BASE_URL = process.env.NODE_ENV === "production"
    ? "https://vlib-srver.herokuapp.com"
    : "http://localhost:3003";


const getAllVideos = async () => {

    const res = await axios.get(`${BASE_URL}/videos`);
    return res.data;
}

const getVideosByCategory = async (category) => {

    const cat = category.toLowerCase().split(" ").join("-");

    const res = await axios.get(`${BASE_URL}/videos/${cat}`);
    return res.data;
}

const login = async (data) => {

    const res = await axios.post(`${BASE_URL}/auth/login`, data);
    const user = res.data;

    localStorage.setItem("user", JSON.stringify(user));
    return user;
}

const register = async (userData) => {
    const res = await axios.post(`${BASE_URL}/auth/register`, userData);
    const user = res.data;

    localStorage.setItem("user", JSON.stringify(user));

    return user;
}

export {
    getAllVideos,
    getVideosByCategory,
    login,
    register
}