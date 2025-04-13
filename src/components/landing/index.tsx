import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 2rem;
  box-sizing: border-box; /* Garante que o padding seja incluído no tamanho total */
  overflow: hidden; /* Evita que o conteúdo ultrapasse os limites */
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    font-size: 1.8rem; /* Reduz o tamanho da fonte em telas menores */
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

const FeaturesSection = styled.section`
  margin: 2rem 0;
  text-align: center;
  max-width: 90%; /* Limita a largura máxima */
  width: 100%; /* Garante que ocupe 100% do espaço disponível */
  box-sizing: border-box;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap; /* Permite que os itens quebrem linha */
  justify-content: center;
  gap: 1rem; /* Espaçamento entre os itens */
`;

const FeatureItem = styled.li`
  font-size: 1rem;
  color: #333;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px; /* Define uma largura mínima */
  max-width: 300px; /* Define uma largura máxima */
  flex: 1; /* Permite que os itens cresçam igualmente */

  &::before {
    content: "✔";
    color: #28a745;
    margin-right: 0.5rem;
  }
`;

const DashboardSection = styled.section`
  margin: 2rem 0;
  text-align: center;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 90%; /* Limita a largura máxima */
  width: 100%; /* Garante que ocupe 100% do espaço disponível */
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem; /* Reduz o padding em telas menores */
  }
`;

const DashboardTitle = styled.h2`
  font-size: 1.8rem;
  color: #007bff;
  margin-bottom: 1rem;
`;

const DashboardDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem; /* Reduz o padding do botão */
    font-size: 0.9rem; /* Reduz o tamanho da fonte */
  }
`;

const Footer = styled.footer`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: #888;
`;

const LandingPage: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Bem-vindo à To-Do List</Title>
        <Subtitle>Organize suas tarefas de forma simples e eficiente!</Subtitle>
      </Header>

      <FeaturesSection>
        <h2>Recursos e Funcionalidades</h2>
        <FeaturesList>
          <FeatureItem>
            Criação de tarefas com título, descrição e categoria
          </FeatureItem>
          <FeatureItem>
            Marcar tarefas como concluídas com um duplo clique
          </FeatureItem>
          <FeatureItem>
            Filtrar tarefas por categoria, status e ordem
          </FeatureItem>
          <FeatureItem>Gerenciamento de categorias personalizadas</FeatureItem>
          <FeatureItem>Interface intuitiva e responsiva</FeatureItem>
        </FeaturesList>
        <Button >
          <Link to="/Auth" style={{ textDecoration: 'none', color: '#fff' } } state={{ isRegister: true }}>
            Cadastrar-se
          </Link>
        </Button>
      </FeaturesSection>

      <DashboardSection>
        <DashboardTitle>Dashboard de Controle</DashboardTitle>
        <DashboardDescription>
          Tenha uma visão completa do seu progresso com o nosso Dashboard:
        </DashboardDescription>
        <FeaturesList>
          <FeatureItem>Visualize o total de tarefas criadas</FeatureItem>
          <FeatureItem>Acompanhe as tarefas concluídas</FeatureItem>
          <FeatureItem>Gerencie suas categorias personalizadas</FeatureItem>
        </FeaturesList>
        <ButtonContainer>
        <Button >
          <Link to="/Auth" style={{ textDecoration: 'none', color: '#fff' } }>
            Acessar Dashboard
          </Link>
        </Button>
        </ButtonContainer>
      </DashboardSection>

      <Footer>
        <p>© 2025 To-Do List. Todos os direitos reservados.</p>
      </Footer>
    </Container>
  );
};

export default LandingPage;
