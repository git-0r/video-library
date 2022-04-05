const axios = require("axios");

const BASE_URL = process.env.NODE_ENV === "production"
    ? "https://vlib-srver.herokuapp.com/"
    : "http://localhost:3003/";


const getAllVideos = async () => {

    const res = await axios.get(`${BASE_URL}videos`);
    return res.data;
}

const getVideosByCategory = async (category) => {

    const cat = category.split(" ").join("-");

    const res = await axios.get(`${BASE_URL}videos/${cat}`);
    return res.data;
}

export {
    getAllVideos,
    getVideosByCategory
}