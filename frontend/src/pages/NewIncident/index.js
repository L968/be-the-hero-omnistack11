import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
    const ongId = localStorage.getItem('ongId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = { title, description, value };

        try {
            await api.post('incident', data, { headers: { Authorization: ongId } });
            alert('Incident created!');

            history.push('/profile');
        } catch (error) {
            alert('Error in create incident: ' + error);
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Create a new incident</h1>
                    <p>Describe the incident detailed to find a hero to solve it.</p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Back
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Incident Title" value={title}       onChange={ e => setTitle(e.target.value) } />
                    <textarea placeholder="Description"   value={description} onChange={ e => setDescription(e.target.value) } />
                    <input placeholder="Value in Dollars" value={value}       onChange={ e => setValue(e.target.value) } />

                    <button type="submit" className="button">Create</button>
                </form>
            </div>
        </div>
    );
}