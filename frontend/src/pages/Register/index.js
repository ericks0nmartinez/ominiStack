import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';
import api from '../../services/api';
import Logo from '../../asses/logo.svg';


export default function Register() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [city,setCity] = useState('');
    const [uf,setUf] = useState('');
    
    const history = useHistory();

    async function handleRegister(e) {
    e.preventDefault();
    const data = {
        name,
        email,
        whatsapp,
        city,
        uf
    };
    try {
        const response = await api.post('ongs',data);
        alert(`Seu ID de acesso: ${response.data.id}`);
        history.push('/')
    } catch{
        alert('Erro no cadstro, tente novamente');
    }
}
        return (
        <div className="register-container">
            <div className="content">
                <section className="form">
                    <img src={Logo} alt="Logo" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link to="/" className="bach-link">
                        <FiArrowLeft size="16px" color="#e02045" />
                        Não tenho Cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome Da ONG"
                        value={name}
                        required
                        onChange={e=>setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        required
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        required
                        onChange={e=> setWhatsapp(e.target.value)}    
                    />
                    <div className="input-group">
                        <input 
                            placeholder="Cidade" 
                            value={city}
                            required
                            onChange={e=> setCity(e.target.value)}    
                        />
                        <input 
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            required
                            onChange={e=>setUf(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="button">Registrar</button>
                </form>
            </div>
        </div>
    );
}