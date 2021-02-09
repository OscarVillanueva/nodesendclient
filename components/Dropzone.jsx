import React, { useContext, useCallback, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import Files from './Files';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';
import Form from "./Form"

const Dropzone = () => {
    
    // Usamos el context de app
    const { loadingFile, showAlert , uploadFile, createLink, setAuthor } = useContext( appContext )

    // Usamos el context de autenticación
    const { authenticated, user } = useContext( authContext )

    // Para agregar el autor al state
    useEffect(() => {
        
        // Revisamos que tengamos un author o iniciada la sesión
        if( user ) setAuthor( user.id )

        // si no hay mandamos a null
        else setAuthor( null )

    }, [user])

    // Función que se ejecuta cuando se solto un archivo o lo que se vaya subiendo y cuando es aceptado
    const onDropAccepted = useCallback(async (acceptedFiles) => {
        
        // Creamos un FormData
        const formData = new FormData()
        formData.append("file", acceptedFiles[0])
        
        // Subir el archivo
        uploadFile(formData, acceptedFiles[0].path);

    }, [])  

    // Para archivos que son rechazados en este caso que pesan más de 1 MB
    const onDropRejected = () => {
        showAlert("No se pudo subir, el limite es 1 MB obten una cuenta gratis para subir archivos más grandes");
    }
    
    // Extraer contenido de dropzone
    const { isDragActive, acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDropAccepted, onDropRejected, maxSize: user ? 1024 * 1024 * 10 : 1024 * 1024})

    return ( 
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100">

            { acceptedFiles.length > 0 
                ?  (
                    <div className="mt-10 w-full flex flex-col items-center">

                        <h4 className="text-xl font-bold mb-4 text-center">
                            Archivos
                        </h4>

                        <Files 
                            acceptedFiles = { acceptedFiles }
                        />

                        { authenticated && <Form />  }

                        { 
                            loadingFile 
                            ? <p className = "my-10 text-center text-gray-600">
                                Subiendo archivo . . .
                            </p> 
                            : <button 
                                    className = "bg-blue-700 w-10/12 py-3 rounded text-white my-10 hover:bg-blue-800"
                                    type="button"
                                    onClick = { () => createLink() }
                                >
                                    Crear enlace
                                </button> 
                        }

                    </div>
                )
                :  (
                    <div {...getRootProps({ className: "dropzone w-full py-32 " }) } >

                        <input className = "h-100" { ...getInputProps() }/>

                            { isDragActive 
                                ? (
                                    <p className = "text-2xl text-center text-gray-600">
                                        Suelta el archivo
                                    </p>
                                ) 
                                : (
                                    <div className="text-center">
                                        <p className="text-2xl text-center text-gray-600">
                                            Selecciona un archivo y arrastralo aquí
                                        </p>

                                        <button 
                                            className = "bg-blue-700 w-10/12 py-3 rounded text-white my-10 hover:bg-blue-800"
                                            type = "button"
                                        >

                                            Selecciona archivos para subir

                                        </button>
                                    </div>
                                ) 
                            }

                    </div>
                )
            }

        </div>
    );
}
 
export default Dropzone;