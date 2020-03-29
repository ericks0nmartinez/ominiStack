import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './style.css';

import Logo from '../../asses/logo.svg';
import Heros from '../../asses/heroes.png';
import api from '../../services/api';

export default function Logon() {

    const [id,setID] = useState('');
    
    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();
      
        try {
            const response = await api.post('sessions', { id });
            localStorage.setItem('ongID', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile')
        } catch(err){
            alert('Falha no login Tente Novamente');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={ Logo} alt="Logo" />
                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>
                    <input 
                        required
                        placeholder="Sua ID"
                        value={id}
                        onChange={e =>setID(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>
                    <Link to="/register" className="bach-link">
                        <FiLogIn size="16px" color="#e02045"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>            
            <img src= { Heros } alt="heroes"/>
        </div>
    );
}