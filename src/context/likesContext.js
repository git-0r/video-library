import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../utils/localStorage";

const likesContext = createContext()

const LikesProvider = ({ children }) => {

    const [likes, updateLikes] = useState(useLocalStorage("likes"));
    return (
        <likesContext.Provider value={{ likes, updateLikes }}>
            {children}
        </likesContext.Provider>
    )
}

const useLikes = () => useContext(likesContext);

export { LikesProvider, useLikes };