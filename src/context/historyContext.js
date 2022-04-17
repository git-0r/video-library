import { createContext, useContext, useState } from "react";

const historyContext = createContext()

const HistoryProvider = ({ children }) => {

    const [history, setHistory] = useState();
    return (
        <historyContext.Provider value={{ history, setHistory }}>
            {children}
        </historyContext.Provider>
    )
}

const useHistory = () => useContext(historyContext);

export { HistoryProvider, useHistory };