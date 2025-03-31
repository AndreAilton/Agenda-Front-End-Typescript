import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #f5f5f5;
`;

const FormWrapper = styled.div`
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const InputGroup = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    background: #f9f9f9;

    svg {
        margin-right: 0.5rem;
        color: #888;
    }
`;

const Input = styled.input`
    border: none;
    outline: none;
    flex: 1;
    background: transparent;
    font-size: 1rem;
`;

const Button = styled.button`
    background: #007bff;
    color: #fff;
    border: none;
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background: #0056b3;
    }
`;

const ToggleLink = styled.p`
    text-align: center;
    margin-top: 1rem;
    color: #007bff;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const LoginRegisterForm: React.FC = () => {
    const location = useLocation();
    const [isRegister, setIsRegister] = useState(false);

    useEffect(() => {
        if (location.state && location.state.isRegister !== undefined) {
            setIsRegister(location.state.isRegister);
        }
    }, [location.state]);

    const toggleForm = () => {
        setIsRegister(!isRegister);
    };

    return (
        <Container>
            <FormWrapper>
                <Title>{isRegister ? 'Registrar' : 'Login'}</Title>
                <Form>
                    {isRegister && (
                        <InputGroup>
                            <FaUser />
                            <Input type="text" placeholder="Nome" />
                        </InputGroup>
                    )}
                    <InputGroup>
                        <FaEnvelope />
                        <Input type="email" placeholder="Email" />
                    </InputGroup>
                    <InputGroup>
                        <FaLock />
                        <Input type="password" placeholder="Senha" />
                    </InputGroup>
                    <Button type="submit">{isRegister ? 'Registrar' : 'Login'}</Button>
                </Form>
                <ToggleLink onClick={toggleForm}>
                    {isRegister
                        ? 'Ja possui uma conta? Fazer login'
                        : "Não possui uma conta? Criar conta"}
                </ToggleLink>
            </FormWrapper>
        </Container>
    );
};

export default LoginRegisterForm;