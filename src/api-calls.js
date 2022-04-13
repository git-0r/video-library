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

    const res = await axios.get(`${BASE_URL}/videos/category/${cat}`);
    return res.data;
}

const login = async (data) => {

    const res = await axios.post(`${BASE_URL}/auth/login`, data);
    const user = res.data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("watchLater", JSON.stringify(user.watchLater));

    return user;
}

const register = async (userData) => {
    const res = await axios.post(`${BASE_URL}/auth/register`, userData);
    const user = res.data;

    localStorage.setItem("user", JSON.stringify(user));

    return user;
}

const addToWatchLater = async (id, user) => {
    const res = await axios.put(
        `${BASE_URL}/watchlater/add/${user._id}`,
        { id },
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    );
    const data = res.data;
    localStorage.setItem("watchLater", JSON.stringify(data));

    return data;
}

const removeFromWatchLater = async (id, user) => {
    const res = await axios.put(
        `${BASE_URL}/watchlater/remove/${user._id}`,
        { id },
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    );

    const data = res.data;
    localStorage.setItem("watchLater", JSON.stringify(data));

    return data;
}

const getWatchLaterVideos = async (user) => {

    const res = await axios.get(`${BASE_URL}/watchlater/${user._id}`, {
        headers: { token: `Bearer ${user.accessToken}` }
    })

    return res.data;
}

const getVideoById = async (id) => {

    const res = await axios.get(`${BASE_URL}/videos/${id}`);

    return res.data
}

const addToHistory = async (id, user) => {

    const res = await axios.put(`${BASE_URL}/history/add/${user._id}`,
        { id },
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    )
}

const getHistory = async (user) => {

    const res = await axios.get(`${BASE_URL}/history/${user._id}`,
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    );

    return res.data;
}

const deleteHistory = async (user) => {
    const res = await axios.delete(`${BASE_URL}/history/delete/${user._id}`,
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    );

    return res.data;
}

export {
    getAllVideos,
    getVideosByCategory,
    login,
    register,
    addToWatchLater,
    removeFromWatchLater,
    getWatchLaterVideos,
    getVideoById,
    addToHistory,
    getHistory,
    deleteHistory
}