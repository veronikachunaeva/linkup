import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode"
const AuthContext = createContext();

const AuthProvider = ( { children }) => {
    
    const [ user, setUser ] = useState( null );
    const [ token, setToken] = useState(  localStorage.getItem('token') );
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        if (token){
            try {
                const decoded = jwtDecode( token );
                const isExpired = decoded.exp * 1000 < Date.now();
                if (isExpired) {
                    logout();
                    setUser(null);
                    window.location.href = '/login';
                } else {
                    setUser( decoded )
                }
            } catch (error) {
                console.error('Token Invalido', error);
                logout();
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setLoading(false);
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
        <AuthContext.Provider value={ { user, token, loading, login, logout}} >
            { children }
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }