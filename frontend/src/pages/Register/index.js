import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const response = await api.post('ong', {
                name,
                email,
                whatsapp,
                city,
                uf
            });

            if (response.status !== 200) {
                alert(response.data.validation.body.message);
                return;
            }

            alert('Your acess ID: ' + response.data.id);
            history.push('/');
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Register</h1>
                    <p>Create your registration, enter the platform and help people find the incidents of your NGO</p>

                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Back
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="NGO Name" value={name} onChange={ e => setName(e.target.value) } />
                    <input placeholder="E-mail" type="email" value={email} onChange={ e => setEmail(e.target.value) } />
                    <input placeholder="WhatsApp" value={whatsapp} onChange={ e => setWhatsapp(e.target.value) }/>

                    <div className="input-group">
                        <input placeholder="City" value={city} onChange={ e => setCity(e.target.value) }/>
                        <input placeholder="Province Code (Eg: ON)" style={{ width: 235 }} value={uf} onChange={ e => setUf(e.target.value) }/>
                    </div>

                    <button className="button" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}