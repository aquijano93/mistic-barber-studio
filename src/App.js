import { useState } from 'react';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';

import misticCredentials from './credentials'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(misticCredentials)

function App() {
  const [user , setUser] = useState(null)

  onAuthStateChanged(auth, (userFirebase) => {
    if(userFirebase){
      setUser(userFirebase)
    }else{
      setUser(null)
    }
  })

  return (
    <div className="">
      {user ? <Home userEmail = {user.email}/> : <Login/>}
    </div>
  );
}

export default App;
