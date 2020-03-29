import React, { useEffect, useState } from 'react';
import Logo from '../../asses/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './style.css';
import api from '../../services/api';


export default function Profile() {
    const history = useHistory();
    const [incidents, setIncidents] = useState([])
    const nome = localStorage.getItem('ongName');
    const ongID = localStorage.getItem('ongID');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongID,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongID]);

    async function handleDeleteIncidents(id) {
        try {
            console.log("Entrei handleDeleteIncidents");
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongID,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert(`Erro ao deletar o caso, tente Novamente ${err}`);
        }

    }

    function handlLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={Logo} alt="Logo" />
                <span>Bem vindo, {nome}</span>
                <Link to="/incidents/new" className="button">Cadstrar Novo Caso</Link>
                <button onClick={handlLogout} type="button" >
                    <FiPower size={18} color="#e020041" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                        <strong>CASOS:</strong>
                        <p>{incidents.title}</p>
                        <strong>DESCRIÇÃO</strong>
                        <p>{incidents.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pr-BR', { style: 'currency', currency: 'BRL' }).format(incidents.value)}</p>
                        <button onClick={() => handleDeleteIncidents(incidents.id)} ><FiTrash2 size={20} color="#a8a8b3" /> </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


