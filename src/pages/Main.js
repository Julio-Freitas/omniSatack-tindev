import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { Link } from 'react-router-dom';
import './Main.css'
import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import api from '../services/api';
import itsamtach from '../assets/Its-a-match.png';



export default function Main({ match }) {

    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    async function hendleLike (id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: {user:match.params.id}
        });

        setUsers(users.filter( user => user._id !== id));
    }

    async function hendledisLike (id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {user:match.params.id}
        });

        setUsers(users.filter( user => user._id !== id));
    }

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: { user: match.params.id }
            });
            setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id]);

    /** interagindo com  o banco  */
    useEffect(()=>{
        const socket = io('http://localhost:3333', {
            query: { user : match.params.id }
        });
 
        socket.on('match', devs => {
            setMatchDev(devs);
        })

    },[match.params.id]);

    const renderizaUsers = (user) => {
        const {name, avatar, bio } = user;
        return (
            <li key={user._id}>
                <img src={avatar}  />
                <footer>
                    <strong>{name}</strong>
                    <p>{bio}</p>
                </footer>
                <div className='buttons'>
                    <button type='button' onClick={()=> hendleLike(user._id)}>
                        <img src={like} alt='like' />
                    </button>
                    <button type='button' onClick={()=> hendledisLike(user._id)}>
                        <img src={dislike} alt='dislike' />
                    </button>
                </div>
            </li>
        )
    }


    return (
        <div className='main-container'>
            <Link to='/' ><img src={logo} atl='tindev' /></Link>
    
            {users.length > 0 ? 
             <ul>{users.map(renderizaUsers)}</ul>
            : ( <div className='empaty'><h1>Acabou :( </h1></div>  )}

            { matchDev && (
                <div className='match-container'>
                    <img src={itsamtach} alt='Its a match' />
                    <img className='match-avatar' src={matchDev.avatar} />
                    <strong className='match-name'>{matchDev.name}</strong>
                    <p className='match-bio'>matchDev.bio</p>
                    <button type='button' onClick={()=> setMatchDev(null)}>Fechar</button>
                </div>
            )}
        </div>
    )
}