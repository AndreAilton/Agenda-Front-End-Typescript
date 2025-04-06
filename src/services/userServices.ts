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
  } catch (erro: any) {
    // Se a API retornou uma mensagem de erro no JSON:

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
    await axios.post("http://192.168.0.108:3000/tarefas", taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (erro: any) {
    // Se a API retornou uma mensagem de erro no JSON:

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
  } catch (erro: any) {
    if (erro.response && erro.response.data) {
      throw new Error(erro.response.data.errors); // Propaga a mensagem para o componente
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
    const response = await axios.get("http://192.168.0.108:3000/categorias", {
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
    // Verifica se a API retornou uma mensagem de erro no JSON
    if (erro.response && erro.response.data) {
      throw new Error(erro.response.data.errors || "Erro ao buscar categorias.");
    }
    throw new Error("Erro ao buscar categorias. Tente novamente mais tarde.");
  }
};

export const createUserCategory = async (
  token: string,
  categoryData: { category: string }
): Promise<void> => {
  try {
    await axios.post("http://192.168.0.108:3000/categorias", categoryData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (erro: any) {
    // Se a API retornou uma mensagem de erro no JSON:

    if (erro.response && erro.response.data) {
      throw new Error(erro.response.data.errors); // Propaga a mensagem para o componente
    }
    throw new Error("Erro ao criar a Categoria.");
  }
};


export const deleteUserCategory = async (
  token: string,
  CategoryId: number
): Promise<void> => {
  try {
    await axios.delete(`http://192.168.0.108:3000/categorias/${CategoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (erro: any) {
    // Se a API retornou uma mensagem de erro no JSON:

    if (erro.response && erro.response.data) {
      throw new Error(erro.response.data.errors); // Propaga a mensagem para o componente
    }
    throw new Error("Erro ao excluir a tarefa. Tente novamente mais tarde.");
  }
};