import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from '../context/auth/authContext';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';

const Sign = () => {

    // Acceder al state
    const { loading, message, registerUser } = useContext(AuthContext)

    // Formulario y validación con formik/yup
    const formik = useFormik({

        initialValues: {
            name: "",
            email: "",
            password: ""
        },

        validationSchema:  Yup.object({

            name: Yup.string().required("El nombre es obligatorio"),
            email: Yup.string().email("Ingresa un email válido").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria")
                                    .min(6, "La contraseña debe tener almenos 6 caracteres")

        }),

        onSubmit: values => {
            
            registerUser(values)
            
        }

    })

    return ( 

        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">

                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
                    Crear cuenta
                </h2>

                { loading 
                    ? <Spinner />
                    : message && <Alert />
                }

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg ">

                        <form 
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit = { formik.handleSubmit }
                        >

                            <div className="mb-4">
                                <label 
                                    htmlFor = "name"
                                    className="block text-gray-800 text-sm font-bold mb-2"
                                >
                                    Nombre
                                </label>

                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    className="shadow appeareance-none border rounded focus:outline-none focus:shadow-outline border-rounded w-full py-2 px-3 text-gray-800 leading-tight"
                                    placeholder = "Nombre de usuario"
                                    value = { formik.values.name }
                                    onChange = { formik.handleChange } 
                                    onBlur = { formik.handleBlur }
                                />

                                { formik.touched.name && formik.errors.name 
                                    ? (
                                        <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4 rounded">

                                            <p className="font-bold">
                                                Error
                                            </p>

                                            <p>{ formik.errors.name }</p>

                                        </div>
                                    ) 
                                    : null 
                                }

                            </div>

                            <div className="mb-4">
                                <label 
                                    htmlFor = "email"
                                    className="block text-gray-800 text-sm font-bold mb-2"
                                >
                                    Email
                                </label>

                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="shadow appeareance-none border rounded focus:outline-none focus:shadow-outline border-rounded w-full py-2 px-3 text-gray-800 leading-tight"
                                    placeholder = "Correo eléctronico"
                                    value = { formik.values.email }
                                    onChange = { formik.handleChange } 
                                    onBlur = { formik.handleBlur }
                                />

                                { formik.touched.email && formik.errors.email 
                                    ? (
                                        <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4 rounded">

                                            <p className="font-bold">
                                                Error
                                            </p>

                                            <p>{ formik.errors.email }</p>

                                        </div>
                                    ) 
                                    : null 
                                }

                            </div>

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
                                    value = { formik.values.password }
                                    onChange = { formik.handleChange } 
                                    onBlur = { formik.handleBlur }
                                />

                                { formik.touched.password && formik.errors.password 
                                    ? (
                                        <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4 rounded">

                                            <p className="font-bold">
                                                Error
                                            </p>

                                            <p>{ formik.errors.password }</p>

                                        </div>
                                    ) 
                                    : null 
                                }

                            </div>

                            <input 
                                type="submit" 
                                value="Crear cuenta" 
                                className="mt-4 bg-red-500 hover:bg-red-800 w-full p-2 text-white uppercase font-bold rounded"
                            />

                        </form>

                    </div>
                </div>

            </div>
        </Layout>

    );
}
 
export default Sign;