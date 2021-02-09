import React, { useState } from 'react';
import Layout from '../../components/Layout';
import client from '../../config/axios';

// Respuestas que se van a obtener y se pasan al componente
export async function getServerSideProps({ params }) {
    
    const { link } = params
    const result = await client.get(`/api/links/${link}`)

    // Las propiedades que se le van a pasar al componente
    return {
        props: {

            link: result.data

        }
    }

}

// Routing, se crean las páginas que se van a mostrar y aquí se definen los props a pasar
export async function getServerSidePaths() {
    
    const links = await client.get("/api/links")

    // fallback para urls que no encuenta si esta true muestra algo si esta como false 404
    return {
        paths: links.data.links.map( link => ({

            params: {
                link: link.url
            }

        })),
        fallback: false
    }

}

const Link = ({ link }) => {

    // Guardamos si tiene contraseña
    const [hasPassword, setHasPassword] = useState(link.password)

    // Guardamos si tiene archivo
    const [file, setFile] = useState(link.file)

    // Contraseña
    const [password, setPassword] = useState("")

    // Preguntamos si la contraseña es correcta
    const checkPassword = async e => {
        
        e.preventDefault()

        const data = {
            password
        }

        try {

            const response = await client.post(`/api/links/${link.link}`, data)
            
            setHasPassword( response.data.password )
            setFile( response.data.file )

        } catch (error) {
            console.log(error);
        }

    }

    return ( 
        <Layout>

            { !hasPassword 
                ? (
                    <>
                        <h1 className="text-4xl text-center text-gray-700">
                            Descarga tu archivo
                        </h1>

                        <div className="flex items-center justify-center mt-10">
                            <a 
                                href = {`${process.env.BACKEND_URL}/api/files/${file}`} 
                                className = "bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer hover:bg-red-700"
                            >
                                Aquí
                            </a>
                        </div>
                    </>
                ) 
                : (
                    <>
                        <p className = "text-center">
                            Este enlace esta protegido con un password, colocalo a continuación
                        </p>
    
                        <div className = "flex justify-center mt-5">
                            <div className="w-full max-w-lg ">

                                <form 
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit = { e => checkPassword( e ) }
                                >

                                    <div className="mb-4">

                                        <label 
                                            htmlFor = "password"
                                            className="block text-gray-800 text-sm font-bold mb-2"
                                        >
                                            Contraseña
                                        </label>

                                        <input 
                                            type="password" 
                                            name="password" 
                                            id="password" 
                                            className="shadow appeareance-none border rounded focus:outline-none focus:shadow-outline border-rounded w-full py-2 px-3 text-gray-800 leading-tight"
                                            placeholder = "Contraseña"
                                            value = { password }
                                            onChange = { e => setPassword( e.target.value ) }
                                        />

                                    </div>

                                    <input 
                                        type="submit" 
                                        value="Validar contraseña" 
                                        className="mt-4 bg-red-500 hover:bg-red-800 w-full p-2 text-white uppercase font-bold rounded"
                                    />

                                </form>

                            </div>
                        </div>
    
                    </>
                ) 
            }

            

        </Layout>
    );
}
 
export default Link;