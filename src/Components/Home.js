import misticCredentials from '../credentials';

import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc} from 'firebase/firestore'
import {Metronome} from '@uiball/loaders'
import { async } from '@firebase/util';


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
    const [lista, setLista] = useState([])
    const [subId, setSubId] = useState('')
    const [loading, setLoading] = useState(false);

    const inputsValues = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    //funcion para cargar datos en la DB

    const saveData = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, 'clientes'), {
                ...user
            })
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
        setUser({...dataRecords})
    }

    //funcion para traer datos de la DB

    useEffect(()=> {
        const getLista = async()=> {
            try {
                const querySnapshot = await getDocs(collection(db,'clientes'))
                const docs = []
                querySnapshot.forEach((doc)=>{
                    docs.push({...doc.data(), id:doc.id})
                }) 
                setLista(docs)
            }catch (error){
                console.log(error)
            }
        }
        getLista()
    },[lista])

    //funcion para eliminar registro

    const deleteUser = async(id) => {
        await deleteDoc(doc(db, 'clientes', id))
    }

    //funcion para actualizar registro

    const getOne = async(id)=>{
        try {
            const docRef = doc(db, 'clientes', id)
            const docSnap = await getDoc(docRef)
                setUser(docSnap.data())
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(()=>{
        if(subId !== ''){
            getOne(subId)
        }
    },[subId])

    //render loading

    if(loading){
        return(
        <Metronome 
        size={40}
        speed={1.6} 
        color= "blanchedalmond" 
        />
        )
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

                <div className='col-md-8 mt-1'>
                <h4 className='text-center'>Registro de clientes</h4>

                <table className='table table-dark table-striped'>

                    <thead>
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Ult visita</th>
                        <th scope='col'>Acción</th>
                        <th scope='col'>Acción</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            lista.map(list=>(
                                <tr key={list.id}>
                                    <td>{list.nombre}</td>
                                    <td>{list.apellido}</td>
                                    <td>{list.telefono}</td>
                                    <td>{list.fecha}</td>
                                    <td><button className='btn btn-danger' onClick={()=>deleteUser(list.id)}>Borrar</button></td>
                                    <td><button className='btn btn-success' onClick={()=> setSubId(list.id)}>Actualizar</button></td>
                                </tr>
                            ))
                        }

                    </tbody>

                </table>

                </div>

            </div>

        </div>
    )
}

export default Home