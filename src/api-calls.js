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
    localStorage.setItem("likes", JSON.stringify(user.likes));
    localStorage.setItem("playlists", JSON.stringify(user.playlists));

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

    await axios.put(`${BASE_URL}/history/add/${user._id}`,
        { id },
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    )
}

const removeFromHistory = async (id, user) => {

    const res = await axios.put(`${BASE_URL}/history/remove/${user._id}`,
        { id },
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    )

    return res.data;
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

const getLikes = async (user) => {

    const res = await axios.get(`${BASE_URL}/likes/${user._id}`,
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    )

    return res.data;
}

const likeVideo = async (id, user) => {

    const res = await axios.put(`${BASE_URL}/likes/add/${user._id}`,
        { id },
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    );

    const likes = res.data;
    localStorage.setItem("likes", JSON.stringify(likes))

    return likes;
}

const dislikeVideo = async (id, user) => {

    const res = await axios.put(`${BASE_URL}/likes/remove/${user._id}`,
        { id },
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    );

    const likes = res.data;
    localStorage.setItem("likes", JSON.stringify(likes))

    return likes;
}

const createNewPlaylist = async (title, user) => {

    const res = await axios.put(`${BASE_URL}/playlist/create/${user?._id}`,
        { title },
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    )
    const playlists = res.data;
    localStorage.setItem("playlists", JSON.stringify(playlists));

    return playlists;
}

const getPlaylist = async (playlistId) => {
    const res = await axios.get(`${BASE_URL}/playlist/${playlistId}`)
    return res.data;
}

const getAllPlaylists = async (user) => {
    const res = await axios.get(`${BASE_URL}/playlist/all/${user?._id}`,
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    )
    const playlists = res.data;
    localStorage.setItem("playlists", JSON.stringify(playlists));

    return playlists;
}

const addVideoToPlaylist = async (playlistId, videoId, user) => {
    const res = await axios.put(`${BASE_URL}/playlist/video/add/${user?._id}`,
        { videoId, playlistId },
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    )
    const playlists = res.data;
    localStorage.setItem("playlists", JSON.stringify(playlists));

    return playlists;
}

const removeVideoFromPlaylist = async (playlistId, videoId, user) => {
    const res = await axios.put(`${BASE_URL}/playlist/video/remove/${user?._id}`,
        { videoId, playlistId },
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    )
    const playlists = res.data;
    localStorage.setItem("playlists", JSON.stringify(playlists));

    return playlists;
}

const deletePlaylist = async (playlistId, user) => {
    const res = await axios.put(`${BASE_URL}/playlist/delete/${user?._id}`,
        { playlistId },
        {
            headers: { token: `Bearer ${user.accessToken}` }
        }
    );

    const playlists = res.data;
    localStorage.setItem("playlists", JSON.stringify(playlists));

    return playlists;
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
    removeFromHistory,
    getHistory,
    deleteHistory,
    likeVideo,
    dislikeVideo,
    getLikes,
    createNewPlaylist,
    getAllPlaylists,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    getPlaylist
}