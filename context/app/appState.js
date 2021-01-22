import React, { useReducer } from 'react';
import AppContext from './appContext';
import appReducer from './appReducer';
import client from '../../config/axios';
import { 
    SHOW_ALERT, 
    CLEAN_ALERT, 
    UPLOAD_FILE_FAIL, 
    UPLOAD_FILE_SUCCESS, 
    CREATE_LINK_FAIL, 
    CREATE_LINK_SUCESS,
    START_SPINNER,
    CLEAN_STATE
} from "../../types";

const AppState = ({ children }) => {

    // State inicial
    const initialState = {
        fileMessage: null,
        name: "",
        fileName: "",
        loadingFile: false,
        downloads: 1,
        password: "",
        author: null,
        url: ""
    }

    // Creamos el reducer
    const [ state, dispatch ] = useReducer(appReducer, initialState)

    // Muestra una alerta
    const showAlert = message => {
        
        console.log(message);

        dispatch({
            type: SHOW_ALERT,
            payload: message
        })

        setTimeout(() => {

            dispatch({
                type: CLEAN_ALERT,
                payload: message
            })

        }, 3000);

    }

    // Función para subir los archivos al servidor
    const uploadFile = async (formData, fileName) => {

        dispatch({
            type: START_SPINNER,
            payload: true
        })

        try {

            const response = await client.post("/api/files", formData) 

            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: {
                    name: response.data.file,
                    fileName
                }
            })
            
        } catch (error) {
            console.log(error);

            dispatch({
                type: UPLOAD_FILE_FAIL,
                payload: error.response.data.msg
            })
        }

    }

    // Función para crear un enlace una vez que se subió un archivo
    const createLink = async () => {

        const data = {
            name: state.name,
            file_name: state.fileName,
            downloads: state.downloads,
            password: state.password,
            author: state.author,
        }

        try {

            const response = await client.post("/api/links", data)

            dispatch({
                type: CREATE_LINK_SUCESS,
                payload: response.data.msg
            })
            
        } catch (error) {
            console.log(error);
        }

    }

    const cleanState = () => {
        
        dispatch({
            type: CLEAN_STATE
        })

    }

    return ( 
        <AppContext.Provider
            value = {{
                fileMessage: state.fileMessage,
                name: state.name,
                fileName: state.fileName,
                loadingFile: state.loadingFile,
                downloads: state.downloads,
                password: state.password,
                url: state.url,
                author: state.author,
                showAlert,
                uploadFile,
                createLink,
                cleanState
            }}
        >
            { children }
        </AppContext.Provider>
    );
}
 
export default AppState;