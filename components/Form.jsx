import React, { useState, useContext } from 'react';
import appContext from '../context/app/appContext';

const Form = () => {

    // Para mostrar o no el input de la contraseña
    const [isPassword, setIsPassword] = useState(false)

    // Context de la aplicación
    const { downloads, setPassword, setDownloads } = useContext( appContext )


    return ( 

        <div className="w-10/12 mt-20">

            <div>
                <label className="text-lg text-gray-800">
                    Eliminar tras:
                </label>
    
                <select 
                    className = "appearence-none w-full mt-2 bg-white border boder-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                    onChange = { e =>  setDownloads( parseInt(e.target.value) )}
                    value = { downloads }
                >
    
                    <option value="" defaultValue disabled> -- Seleccione -- </option>
                    <option value="1">1 Descarga</option>
                    <option value="5">5 Descargas</option>
                    <option value="10">10 Descargas</option>
                    <option value="20">20 Descargas</option>
    
                </select>
            </div>

            <div className = "mt-4">

                <div className="flex justify-between items-center">

                    <label className="text-lg text-gray-800 mr-2">
                        Proteger con contraseña
                    </label>

                    <input 
                        type="checkbox"
                        onChange = { () => setIsPassword( !isPassword ) }
                    />

                </div>

                { isPassword && 
                
                    <input 
                        type="password"
                        placeholder = "Contraseña"
                        className = "appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                        onChange = { e => setPassword( e.target.value ) }
                    />

                }


            </div>

        </div>

    );
}   
 
export default Form;