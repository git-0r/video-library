import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../utils/localStorage";

const watchLaterContext = createContext()

const WatchLaterProvider = ({ children }) => {

    const [watchLater, updateWatchLater] = useState(useLocalStorage("watchLater"));
    return (
        <watchLaterContext.Provider value={{ watchLater, updateWatchLater }}>
            {children}
        </watchLaterContext.Provider>
    )
}

const useWatchLater = () => useContext(watchLaterContext);

export { WatchLaterProvider, useWatchLater };