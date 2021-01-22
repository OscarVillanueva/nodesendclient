import React from 'react';
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

    return ( 
        <Layout>

            <h1 className="text-4xl text-center text-gray-700">
                Descarga tu archivo
            </h1>

            <div className="flex items-center justify-center mt-10">
                <a 
                    href = {`${process.env.BACKEND_URL}/api/files/${link.file}`} 
                    className = "bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer hover:bg-red-700"
                >
                    Aquí
                </a>
            </div>

        </Layout>
    );
}
 
export default Link;