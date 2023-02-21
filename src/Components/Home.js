import React from 'react';

import misticCredentials from '../credentials';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(misticCredentials);

const Home = ({userEmail}) => {
    return (
        <div className='container'>
            <p>Bienvenido, <strong>{userEmail}!</strong></p>
            <button className='btn btn-secondary' onClick={()=>signOut(auth)}> Cerrar Sesión
            </button>
            <div>
            <h1>Acá va a ir una tabla de base de datos</h1>
            </div>

        </div>
    )
}

export default Home