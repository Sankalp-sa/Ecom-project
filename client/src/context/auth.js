import axios from 'axios';
import React, {useState, useContext, createContext, useEffect} from 'react'

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({
        user: null,
        token: "",
    })

    axios.defaults.headers.common["Authorization"] = auth?.token;   

    useEffect(() => {  
    const data = localStorage.getItem("auth");
    const parseDate = JSON.parse(data);

        if(parseDate){
            setAuth({
                ...auth,
                user: parseDate.user,
                token: parseDate.token,
            })
        }
        //eslint-disable-next-line
    }, [])

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

// custom hook
const useAuth = () => useContext(AuthContext);

export {useAuth, AuthProvider}