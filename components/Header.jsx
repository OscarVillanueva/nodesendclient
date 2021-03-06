import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';

const Header = () => {

    // Extraer el usuario autenticado del storage
    const { user, whoiam, logOut } = useContext( authContext )

    // Context de la app
    const { cleanState } = useContext( appContext )

    // Router
    const router = useRouter()

    // Revisar si ya esta autenticado
    useEffect(() => {

        whoiam()
        
    }, [])

    const returnToHome = () => {
        
        router.push("/")
        cleanState()

    }

    return ( 

        <header className="py-8 flex flex-col md:flex-row items-center justify-between">

            <img 
                onClick = { returnToHome }
                className = "w-64 mb-8 md:mb-0 cursor-pointer"
                src="/logo.svg" 
                alt="logo"
            />

            <div>
                { user 
                    ? (
                        <div className = "flex items-center">
                            <p className = "mr-2">Hola {user.name}</p>
                            <button 
                                type = "button"
                                className="bg-gray-800 hover:bg-gray-900 px-5 py-3 rounded-lg text-white font-bold uppercase"
                                onClick = { logOut }
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    ) 
                    : (
                        <>
                            <Link href = "/login">
                                <a className="bg-red-500 hover:bg-red-700 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">
                                    Iniciar sesión
                                </a>
                            </Link>
                
                            <Link href = "/sign">
                                <a className="bg-gray-800 hover:bg-gray-900 px-5 py-3 rounded-lg text-white font-bold uppercase">
                                    Crear cuenta
                                </a>
                            </Link>
                        </>
                    ) 
                }
            </div>

        </header>

    );
}
 
export default Header;