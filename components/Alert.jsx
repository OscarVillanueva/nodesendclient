import React, { useContext } from 'react';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';

const Alert = () => {

    // Extraer mensaje de error de autenticación   
    const { message } = useContext(authContext)

    // Extraer mensaje de error de archivos   
    const { fileMessage } = useContext( appContext )

    return ( 

        <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto rounded">
            { message || fileMessage}
        </div>

    );
}
 
export default Alert;