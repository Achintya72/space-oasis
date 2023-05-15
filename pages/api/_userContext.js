import { createContext, useState } from "react";

const UserContext = createContext(null);
const UserContextProvider = ({ children }) => {
    const [auth, changeAuth] = useState(false);
    const [user, changeUser] = useState(null);

    const values = {
        user,
        auth
    }
    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserContextProvider
};