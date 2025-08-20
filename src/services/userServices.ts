import axios from "axios";


const BASE_URL = "https://andreailtondev.tech/api/agenda/";

export const getUser = async (token: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (erro: any) {
    if (erro.response.data) {
      throw new Error(erro.response.data.errors);
    }
    throw new Error("Erro ao registrar usuário. Tente novamente mais tarde.");
  }
};

export const getUserTasks = async (token: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/tarefas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (erro: any) {
    if (erro.response.data) {
      throw new Error(erro.response.data.errors);
    }
    throw new Error("Erro ao registrar usuário. Tente novamente mais tarde.");
  }
};

export const deleteUserTask = async (
  token: string,
  taskId: number
): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/tarefas/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (erro: any) {
    if (erro.response && erro.response.data) {
      throw new Error(erro.response.data.errors);
    }
    throw new Error("Erro ao excluir a tarefa. Tente novamente mais tarde.");
  }
};

export const createUserTask = async (
  token: string,
  taskData: { tittle: string; description: string; category: string }
): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/tarefas`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (erro: any) {
    if (erro.response && erro.response.data) {
      throw new Error(erro.response.data.errors);
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
    await axios.put(`${BASE_URL}/tarefas/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (erro: any) {
    if (erro.response && erro.response.data) {
      throw new Error(erro.response.data.errors);
    }
    throw new Error("Erro ao atualizar a tarefa. Tente novamente mais tarde.");
  }
};

interface UserCategory {
  id: number;
  category: string;
  created_at: string;
  updated_at: string;
}

export const getUserCategorys = async (token: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/categorias`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const categories = response.data.categorias as UserCategory[];
    return categories.map((category) => ({
      id: category.id,
      category: category.category,
    }));
  } catch (erro: any) {
    if (erro.response && erro.response.data) {
      throw new Error(
        erro.response.data.errors || "Erro ao buscar categorias."
      );
    }
    throw new Error("Erro ao buscar categorias. Tente novamente mais tarde.");
  }
};

export const createUserCategory = async (
  token: string,
  categoryData: { category: string }
): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/categorias`, categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (erro: any) {
    if (erro.response && erro.response.data) {
      throw new Error(erro.response.data.errors);
    }
    throw new Error("Erro ao criar a Categoria.");
  }
};

export const deleteUserCategory = async (
  token: string,
  CategoryId: number
): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/categorias/${CategoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (erro: any) {
    if (erro.response && erro.response.data) {
      throw new Error(erro.response.data.errors);
    }
    throw new Error("Erro ao excluir a tarefa. Tente novamente mais tarde.");
  }
};
