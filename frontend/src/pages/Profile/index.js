import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: { Authorization: ongId }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);


    async function handleDeleteIncident(id){
        try {
            await api.delete('incident/' + id, { headers: { Authorization: ongId } });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Erro ao deletar caso');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Welcome, {ongName}</span>

                <Link className="button" to="/incidents/new">Create new incident</Link>
                <button onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Incidents</h1>

            <ul>
                {incidents.map( incident => (
                    <li key={incident.id}>
                        <strong>INCIDENT:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>

                        <strong>VALUE:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}