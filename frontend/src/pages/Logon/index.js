import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import { FiLogIn } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {

    const[id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('session', { id });

            if (response.status !== 200) {
                alert(response.data.validation.body.message);
                return;
            }

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert('An unexpected error has occurred. Please try again later');
            console.log(error.message);
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Login</h1>

                    <input placeholder="Your ID" value={id} onChange={ e => setId(e.target.value) } />

                    <button type="submit" className="button">Login</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#e02041" />
                        Sign Up
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}