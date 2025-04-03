// src/services/authUser.ts
import axios from "axios";

export interface NovoUsuario {
  name: string;
  email: string;
  password: string;
}

export interface UsuarioCriado {
  status: boolean;
  id: number;
  name: string;
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
  password_hash: string;
}

interface RespostaApi {
  success: boolean;
  user: UsuarioCriado;
}

interface usuario {
  email: string;
  password: string;
}

interface RespostaLogin {
  success: boolean;
  token: string;
}

export const login = async (usuario: usuario): Promise<RespostaLogin> => {
  try {
    const response = await axios.post<RespostaLogin>(
      "http://192.168.0.108:3000/token",
      usuario // Timeout de 5 segundos
    );

    return response.data;
  } catch (erro: any) {
    // Se há uma resposta do servidor
    if (erro.response && erro.response.data) {
      throw new Error(
        erro.response.data.error || "Erro desconhecido do servidor"
      );
    }

    // Caso contrário, erro genérico
    throw new Error("Erro ao fazer login. Tente novamente mais tarde.");
  }
};

export const register = async (usuario: NovoUsuario): Promise<RespostaApi> => {
  try {
    const response = await axios.post<RespostaApi>(
      "http://192.168.0.108:3000/users",
      usuario
    );
    console.log(response.data.user);
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

export const getUser = async (token: string): Promise<any> => { 
  try {
    const response = await axios.get("http://192.168.0.108:3000/users",
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        timeout: 5000 // Timeout de 5 segundos
      }
    )

    return response.data.sucess;
  } catch (erro: any) { 
    // Se a API retornou uma mensagem de erro no JSON:
    console.log(erro);
    if (erro.response.data) {
      throw new Error(erro.response.data.errors); // propaga a mensagem para o componente
    }
    throw new Error("Erro ao registrar usuário. Tente novamente mais tarde.");
  }

}