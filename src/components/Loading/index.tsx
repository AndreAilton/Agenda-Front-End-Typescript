import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Spinner = styled(FaSpinner)`
    animation: ${spin} 1s linear infinite;
    font-size: 2rem;
    color: #3498db;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    width: 100%;
`;

const Loading: React.FC = () => {
    return (
        <LoadingContainer>
            <Spinner />
        </LoadingContainer>
    );
};

export default Loading;