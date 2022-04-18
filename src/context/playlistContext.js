import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../utils/localStorage";

const playlistContext = createContext()

const PlaylistProvider = ({ children }) => {

    const [playlists, updatePlaylists] = useState(useLocalStorage("playlists"));

    return (
        <playlistContext.Provider value={{ playlists, updatePlaylists }}>
            {children}
        </playlistContext.Provider>
    )
}

const usePlaylist = () => useContext(playlistContext);

export { PlaylistProvider, usePlaylist };