import { createContext, useContext, useReducer } from "react";
import { useLocalStorage } from "../utils/localStorage";

const userContext = createContext();

const UserProvider = ({ children }) => {

    const userReducer = (state, action) => {

        switch (action.type) {

            case "LOGIN":
                return action.payload
            case "REGISTER":
                return action.payload
            case "LOGOUT":
                return null;
            default:
                return state
        }
    }
    const [user, setUser] = useReducer(userReducer, useLocalStorage("user"));

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    )
}

const useUser = () => useContext(userContext);

export { UserProvider, useUser }