import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Alert from '../components/Alert';
import Layout from '../components/Layout';
import Dropzone from '../components/Dropzone';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';

const Index = () => {

    // Extraer el usuario autenticado del storage
    const { whoiam } = useContext( authContext )

    // Extraer alerta del context del app
    const { fileMessage, url } = useContext( appContext )

    // Revisar si ya esta autenticado
    useEffect(() => {

       whoiam()
        
    }, [])

    return ( 

        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">

                { 
                    url 
                    ? (
                        <>
                            <p
                                className = "text-center text-2xl mt-10"
                            >
                                <span className = "font-bold text-red-700 text-3xl uppercase">
                                    Tu URL es: {" "}
                                </span>
    
                                {`${process.env.FRONTEND_URL}/links/${url}`}
                            </p>

                            <button 
                                type = "button"
                                className="mt-4 bg-red-500 hover:bg-red-800 w-full p-2 text-white uppercase font-bold rounded mt-10"
                                onClick = { () => navigator.clipboard.writeText(`${process.env.FRONTEND_URL}/links/${url}`) }
                            >
                                Copiar enlace
                            </button>
                        </>
                    ) 
                    : (
                        <>
                            { fileMessage ? <Alert /> : null }

                            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">

                                <Dropzone />

                                <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">

                                    <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                                        Compartir archivo de forma sencilla y privada
                                    </h2>

                                    <p className="text-lg leading-loose">

                                        <span className="text-red-500 font-bold">ReactNodeSend </span>

                                        te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado después de ser descargado. Así que puedes mantener lo que compartes en privado y asegurarte de que tus cosas no permanezcan en línea para siempre.

                                    </p>

                                    <Link href = "/sign">
                                        <a className="text-red-500 font-bold text-lg hover:text-red-700 mt-5 block">
                                            Crea una cuenta para mayores beneficios
                                        </a>
                                    </Link>

                                </div>       
                            </div>
                        </>
                    ) 
                }

            </div>
        </Layout>
    );
}
 
export default Index;