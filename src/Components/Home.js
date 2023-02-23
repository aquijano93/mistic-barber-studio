import React from 'react';

import misticCredentials from '../credentials';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(misticCredentials);

const Home = ({userEmail}) => {
    if (userEmail==='joaquinpecas@adinet.com.uy'){
        userEmail='Joaco'
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
                    <h3>Ingresar registro</h3>
                    <form>
                        <div className='card card-body'>
                            <div className='d-grid form-group p-1 gap-2'>
                                <input type="text" name='nombre' className='form-control' placeholder='Nombre'/>
                                <input type="text" name='apellido' className='form-control' placeholder='Apellido'/>
                                <input type="text" name="celular" placeholder='Teléfono'className='form-control'/>
                                <input type="email" name='email' placeholder='Email'  className='form-control'/>
                                <textarea type="text" name='notas' placeholder='Notas' className='form-control'/>
                            </div>

                            <button className='btn btn-success'>
                            Insertar registro
                            </button>

                        </div>
                    </form>
                </div>

                <div className='col-md-8'>
                <h4>Registro de clientes</h4>

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