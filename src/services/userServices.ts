import axios from "axios";

export const getUser = async (token: string): Promise<any> => {
  try {
    const response = await axios.get("http://192.168.0.108:3000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (erro: any) {
    // Se a API retornou uma mensagem de erro no JSON:
    console.log(erro);
    if (erro.response.data) {
      throw new Error(erro.response.data.errors); // propaga a mensagem para o componente
    }
    throw new Error("Erro ao registrar usuário. Tente novamente mais tarde.");
  }
};

export const getUserTasks = async (token: string): Promise<any> => {
  try {
    const response = await axios.get("http://192.168.0.108:3000/tarefas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (erro: any) {
    // Se a API retornou uma mensagem de erro no JSON:
    console.log(erro);
    if (erro.response.data) {
      throw new Error(erro.response.data.errors); // propaga a mensagem para o componente
    }
    throw new Error("Erro ao registrar usuário. Tente novamente mais tarde.");
  }
};

export const deleteUserTask = async (
  token: string,
  taskId: number
): Promise<void> => {
  try {
    await axios.delete(`http://192.168.0.108:3000/tarefas/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Tarefa ${taskId} excluída com sucesso.`);
  } catch (erro: any) {
    // Se a API retornou uma mensagem de erro no JSON:
    console.log(erro);
    if (erro.response && erro.response.data) {
      throw new Error(erro.response.data.errors); // Propaga a mensagem para o componente
    }
    throw new Error("Erro ao excluir a tarefa. Tente novamente mais tarde.");
  }
};

export const createUserTask = async (
  token: string,
  taskData: { tittle: string; description: string; category: string }
): Promise<void> => {
  try {
    const response = await axios.post(
      "http://192.168.0.108:3000/tarefas",
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Tarefa criada com sucesso:", response.data);
  } catch (erro: any) {
    // Se a API retornou uma mensagem de erro no JSON:
    console.log(erro);
    if (erro.response && erro.response.data) {
      throw new Error(erro.response.data.errors); // Propaga a mensagem para o componente
    }
    throw new Error("Erro ao criar a tarefa. Tente novamente mais tarde.");
  }
};

export const alterUserTask = async (
  token: string,
  taskId: number,
  taskData: Partial<{
    tittle: string;
    description: string;
    category: string;
    done: boolean;
  }>
): Promise<void> => {
  try {
    await axios.put(`http://192.168.0.108:3000/tarefas/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`Tarefa ${taskId} atualizada com sucesso.`);
  } catch (erro: any) {
    console.log(erro);
    if (erro.response && erro.response.data) {
      throw new Error(erro.response.data.errors); // Propaga a mensagem para o componente
    }
    throw new Error("Erro ao atualizar a tarefa. Tente novamente mais tarde.");
  }
};
