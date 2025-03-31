import React from 'react';
import { Link } from 'react-router-dom';
const NotFound: React.FC = () => {
    return (
        <div className="notfound-container">
            <h1 className="notfound-title">404</h1>
            <p className="notfound-message">Oops! A página que você está procurando não existe.</p>
            <p className="notfound-suggestion">
                Talvez você tenha digitado o endereço errado ou a página foi movida.
            </p>
            <Link to="/" className="home-link">
                Voltar para a página inicial
            </Link>
            <img
                src="/assets/notfound-illustration.png"
                alt="Página não encontrada"
                className="notfound-image"
            />
        </div>
    );
};

export default NotFound;