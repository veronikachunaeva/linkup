import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode"
const AuthContext = createContext();

const AuthProvider = ( { children }) => {
    
    const [ user, setUser ] = useState( null );
    const [ token, setToken] = useState(  localStorage.getItem('token') );

    useEffect( () => {
        if( token){
            try {
                const decoded = jwtDecode( token );
                setUser( decoded )
            } catch (error) {
                console.error('Token Invalido', error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [ token ] );


    const login = ( user, token) => {
        setUser( user );
        setToken( token );
        localStorage.setItem('token', token);
    }

    const logout = () => {
        setUser( null );
        setToken( null );
        localStorage.removeItem('token');
    }
    return (
        <AuthContext.Provider value={ { user, token, login, logout}} >
            { children }
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }