import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../utils/localStorage";

const watchLaterContext = createContext()

const WatchLaterContextProvider = ({ children }) => {

    const [watchLater, updateWatchLater] = useState(useLocalStorage("watchLater"));
    return (
        <watchLaterContext.Provider value={{ watchLater, updateWatchLater }}>
            {children}
        </watchLaterContext.Provider>
    )
}

const useWatchLater = () => useContext(watchLaterContext);

export { WatchLaterContextProvider, useWatchLater };