import React, { useReducer } from "react";
import authContext from './authContext';
import authReducer from "./authReducer";
import { 
    SIGN_IN_SUCCESS, 
    SIGN_IN_FAIL, 
    CLEAN_ALERT, 
    START_SPINNER, 
    LOG_IN_FAILED, 
    LOG_IN_SUCCESS, 
    AUTHENTICATED_USER,
    LOG_OUT
} from "../../types";
import client from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({ children }) => {

    // State inicial
    const initialState = {
        
        token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
        authenticated: null,
        user: null,
        message: null,
        loading: false

    }

    // Definir el reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState)

    // Usuario autenticado
    // const authenticatedUser = name => {
        
    //     dispatch({

    //         type: AUTHENTICATED_USER,
    //         payload: name

    //     })

    // }

    // Registrar nuevos usuarios
    const registerUser = async data => {
        
        try {

            // Activamos el spinner
            dispatch({
                type: START_SPINNER,
            })
            
            // Mandamos el usuario a registrar
            const response = await client.post("/api/users", data)

            // Sacamos la respuesta
            const { data: { msg } } = response

            // Actualizamos el context
            dispatch({
                type: SIGN_IN_SUCCESS,
                payload: msg
            })

        } catch (error) {
            
            // Actualizamos el context
            dispatch({
                type: SIGN_IN_FAIL,
                payload: error.response.data.msg
            })

        } finally {

            // Limpiar alerta despues de 3 segundos
            setTimeout(() => {

                dispatch({
                    type: CLEAN_ALERT,
                    payload: null
                })

            }, 3000);
        }      

    }

    // Iniciar sesión
    const signIn = async data => {
        
        try {
            
            // Activamos el spinner
            dispatch({
                type: START_SPINNER,
            })

            // Solicitamos un token
            const response = await client.post("/api/auth", data)     
            
            // Lo guardamos en el state
            dispatch({
                type: LOG_IN_SUCCESS,
                payload: response.data.token
            })           

        } catch (error) {

            dispatch({
                type: LOG_IN_FAILED,
                payload: error.response.data.msg
            })

        } finally {

            // Limpiar alerta despues de 3 segundos
            setTimeout(() => {

                dispatch({
                    type: CLEAN_ALERT,
                    payload: null
                })

            }, 3000);
        }

    }

    // Obtener el usuario en base al jwt
    const whoiam = async () => {
        
        tokenAuth( state.token )
        
        try {
            
            const response = await client.get("/api/auth")
            
            if ( response.data.user )
                dispatch({
                    type: AUTHENTICATED_USER,
                    payload: response.data.user
                })

        } catch (error) {
            
            // dispatch({
            //     type: LOG_IN_FAILED,
            //     payload: error.response.data.msg
            // })

        }

    }

    // Cerrar sesión
    const logOut = () => {
        
        dispatch({
            type: LOG_OUT
        })

    }

    return ( 
        <authContext.Provider
            value = {{
                user: state.user,
                token: state.token,
                message: state.message,
                authenticated: state.authenticated,
                loading: state.loading,
                registerUser,
                signIn,
                whoiam,
                logOut
            }}
        >
            { children }
        </authContext.Provider>
    );
}
 
export default AuthState;