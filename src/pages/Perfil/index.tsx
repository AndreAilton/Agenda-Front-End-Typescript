import React from 'react';
import styled from 'styled-components';

const PerfilContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #f5f5f5;
`;

const PerfilCard = styled.div`
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 100%;
    max-width: 400px;
`;

const PerfilFoto = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 1rem;
`;

const PerfilNome = styled.h2`
    color: #333;
    margin-bottom: 0.5rem;
`;

const PerfilEmail = styled.p`
    color: #555;
    font-size: 1rem;
`;

const Perfil: React.FC = () => {
    return (
        <PerfilContainer>
            <PerfilCard>
                <PerfilFoto
                    src="https://via.placeholder.com/150"
                    alt="Foto de Perfil"
                />
                <PerfilNome>Seu Nome</PerfilNome>
                <PerfilEmail>seuemail@exemplo.com</PerfilEmail>
            </PerfilCard>
        </PerfilContainer>
    );
};

export default Perfil;