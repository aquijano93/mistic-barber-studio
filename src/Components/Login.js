import React, { useState } from 'react';

import Uno from '../Image/misitc.png'

import misticCredentials from '../credentials'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
const auth = getAuth(misticCredentials);


const Login = () => {

    const [record, setRecord] = useState(false)

    const handlerSubmit = async(e) => {
        e.preventDefault()
        const correo = e.target.email.value;
        const contrasena = e.target.password.value;
        
        if(record) {
            await createUserWithEmailAndPassword(auth, correo, contrasena)
        }
        else{
            await signInWithEmailAndPassword(auth, correo, contrasena)
        }
    }

    return (
        <div className='row container mx-auto p-4'>

            <div className='col-md-8'>

                <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={Uno} alt="" className='size-image' />
                        </div>
                        <div className="carousel-item">
                            <img src={Uno} alt="" className='size-image'/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>  
            
            {/* form goes here*/ }
            <div className='col-md-4'>

                <div className='mt-5 ms-3'>
                    <h1>{record ? 'Registrarse' : 'Iniciar sesi??n'}</h1>
                    <form onSubmit={handlerSubmit}>

                        <div className='mb-3'>
                            <label>Direcci??n de Email:</label>
                            <input type="email" className="form-control" placeholder='Ingresar email' id='email' required/>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Contrase??a:</label>
                            <input type="password" className='form-control' placeholder='Ingresar contrase??a, min 8 caract??res.' id='password' required/>
                        </div>

                        <button className='btn btn-primary col-sm-12' type='submit'>
                            {record ? 'Registrar cuenta' : 'Iniciar sesi??n'}
                        </button>

                        </form>

                        <div className='form-group col-sm-12'>
                            <button className='btn btn-outline-secondary mt-4 form-control' onClick={()=> setRecord(!record)}>
                                {record ? 'Iniciar sesi??n' : 'Registrarse'}
                            </button>
                        </div>
                </div>

            </div>

        </div >
    )
}

export default Login