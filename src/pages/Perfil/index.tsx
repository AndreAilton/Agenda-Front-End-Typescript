import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUser,
  getUserTasks,
  getUserCategorys,
} from "../../services/userServices";
import UserImage from "../../assets/imgs/user.png"; // Imagem padrão do usuário

const PerfilContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem;
`;

const PerfilCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  text-align: center;
`;

const Dashboard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
`;

const DashboardTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
`;

const DashboardItem = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;

  span {
    font-weight: bold;
    color: #007bff;
  }
`;

const Perfil: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [taskCount, setTaskCount] = useState<number>(0);
  const [completedTaskCount, setCompletedTaskCount] = useState<number>(0);
  const [categoryCount, setCategoryCount] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Usuário não autenticado.");
        return;
      }

      try {
        // Busca os dados do usuário
        const userData = await getUser(token);
        setUser(userData.user);

        // Busca as tarefas do usuário
        const tasks = await getUserTasks(token);
        setTaskCount(tasks.length);
        setCompletedTaskCount(tasks.filter((task: any) => task.done).length);

        // Busca as categorias do usuário
        const categories = await getUserCategorys(token);
        setCategoryCount(categories.length);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar os dados do usuário.");
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return (
      <PerfilContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </PerfilContainer>
    );
  }

  if (!user) {
    return (
      <PerfilContainer>
        <p>Carregando...</p>
      </PerfilContainer>
    );
  }

  return (
    <PerfilContainer>
      {/* Cartão de Perfil */}
      <PerfilCard>
        <PerfilFoto
          src={UserImage}
          alt="Foto de Perfil"
        />
        <PerfilNome>{user.name || "Nome não disponível"}</PerfilNome>
        <PerfilEmail>{user.email || "E-mail não disponível"}</PerfilEmail>
      </PerfilCard>

      {/* Mini Dashboard */}
      <Dashboard>
        <DashboardTitle>Informações</DashboardTitle>
        <DashboardItem>
          Total de Tarefas: <span>{taskCount}</span>
        </DashboardItem>
        <DashboardItem>
          Tarefas Concluídas: <span>{completedTaskCount}</span>
        </DashboardItem>
        <DashboardItem>
          Total de Categorias: <span>{categoryCount}</span>
        </DashboardItem>
      </Dashboard>
    </PerfilContainer>
  );
};

export default Perfil;
