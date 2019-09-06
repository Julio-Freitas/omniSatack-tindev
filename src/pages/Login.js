import React, {useState} from 'react';
import logo from '../assets/logo.svg';
import api from '../services/api';
import './login.css'


function Login ( { history }) {
    const [username, setUsaname] = useState('');
    


   async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/devs', {
            username,
        });

        const { _id } = response.data
        
        history.push(`/dev/${_id}`);
    }
 
    return(
        <div className='login-container'>     
            <form onSubmit={handleSubmit}>
            <img src={logo} alt='tindev' />
                <input type='text' value={username} onChange={ e => setUsaname(e.target.value)} placeholder='Digite seu usuário do github'/>
                <button type='submit'>Entrar</button>
            </form>
        </div>      
    )
}

export default Login