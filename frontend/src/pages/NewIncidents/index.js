import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';

import Logo from '../../asses/logo.svg';
import api from '../../services/api';


export default function NewIncidents() {
    const ong_id = localStorage.getItem('ongID');
    const history = useHistory()
    
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');
    
    async function handlerNewIncidents(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }
        try {
            await api.post('incidents',data, {
            headers: {
                Authorization: ong_id
            }
        });
        history.push('/profile')
        } catch (error) {
            alert(`Erro ao cadastrar, tente novamete. ${error}`)
        }
    }



    return (
        <div className="new-incidents-container">
            <div className="content">
                <section className="form">
                    <img src={Logo} alt="Logo" />
                    <h1>Cadastro</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link to="/profile" className="bach-link">
                        <FiArrowLeft size="16px" color="#e02045" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit= {handlerNewIncidents}>
                    <input 
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button type="submit" className="button">Registrar</button>
                </form>
            </div>
        </div>
    );
}