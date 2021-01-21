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

            <h1>Desde enlace</h1>

        </Layout>
    );
}
 
export default Link;