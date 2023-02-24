import React, { useState } from 'react';

import misticCredentials from '../credentials';
import { getAuth, signOut } from 'firebase/auth';
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc} from 'firebase/firestore'

const auth = getAuth(misticCredentials);
const db = getFirestore (misticCredentials);

const Home = ({userEmail}) => {
    if (userEmail==='joaquinpecas@adinet.com.uy'){
        userEmail='Joaco'
    }

    const dataRecords = {
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        servicio: '',
        fecha: ''
    }

    const [user, setUser] = useState(dataRecords);

    const inputsValues = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const saveData = async(e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'clientes'))
        } catch (error) {
            console.log(error);
        }
        setUser({...dataRecords})
    }

    return (
        <div className='container mt-4 vh-100 p-5'>
            <div className='row'>
            <div className='col-sm-2'>
            <p>Bienvenido, <strong>{userEmail}!</strong></p>
            </div>
            <div className='col-sm-10'>
            <button className='btn btn-secondary' onClick={()=>signOut(auth)}> Cerrar Sesión
            </button>
            </div>

            </div>
            
            <hr />

            <div className='row'>
                
                <div className='col-md-4'>
                    <h3 className='text-center'>Ingresar registro</h3>
                    <form onSubmit={saveData}>
                        <div className='card card-body'>
                            <div className='d-grid form-group p-1 gap-2'>

                                <input type="text" name='nombre' className='form-control' placeholder='Nombre' onChange={inputsValues} value={user.nombre}/>

                                <input type="text" name='apellido' className='form-control' placeholder='Apellido' onChange={inputsValues} value={user.apellido}/>

                                <input type="text" name="telefono" placeholder='Teléfono'className='form-control' onChange={inputsValues} value={user.telefono}/>

                                <input type="email" name='email' placeholder='Email'  className='form-control' onChange={inputsValues} value={user.email}/>

                                <textarea type="text" name='servicio' placeholder='Servicio' className='form-control' onChange={inputsValues} value={user.servicio}/>

                                <input type="datetime-local" name='fecha' onChange={inputsValues} value={user.fecha} />

                            </div>

                            <button className='btn btn-success'>
                            Insertar registro
                            </button>

                        </div>
                    </form>
                </div>

                <div className='col-md-8 mt-1 overflow-auto'>
                <h4 className='text-center'>Registro de clientes</h4>

                <table className='table table-dark table-striped'>

                    <thead>
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Ult visita</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>23/02/2023</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>23/02/2023</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                            <td>Smith</td>
                            <td>23/02/2023</td>
                        </tr>
                    </tbody>

                </table>

                </div>

            </div>

        </div>
    )
}

export default Home