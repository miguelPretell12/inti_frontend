import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import clienteAxios from "../../config/ClienteAxios";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    // const [tokenSQL, setTokenSQL] = useState("");
    // const [token, setToken] = useState("");
    const navigate = useNavigate()
    const { pathname } = useLocation();
    useEffect(() => {
        const token = localStorage.getItem("token1")
        
        const autenticar = async () => {
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios.get('/usuarios/perfil', config)
                setAuth(data);
                console.log("paso 3")
                const rutas = ["/", "/confirmar-cuenta", "/olvide-password"];
                console.log(rutas.includes(pathname))
                if (rutas.includes(pathname)) {
                    navigate("/dashboard");
                }
            } catch (error) {
                setAuth({});
                console.log(error)
            }

        }
        if(token){
            autenticar();
        }else{
            navigate("/");
        }

        autenticar();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext