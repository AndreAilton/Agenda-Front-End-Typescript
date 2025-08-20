// src/services/authUser.ts
import axios from "axios";


const BASE_URL = "http://localhost:4001/";

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
      `${BASE_URL}/token`,
      usuario
    );

    return response.data;
  } catch (erro: any) {
    if (erro.response && erro.response.data) {
      throw new Error(
        erro.response.data.error || "Erro desconhecido do servidor"
      );
    }
    throw new Error("Erro ao fazer login. Tente novamente mais tarde.");
  }
};

export const register = async (usuario: NovoUsuario): Promise<RespostaApi> => {
  try {
    const response = await axios.post<RespostaApi>(
      `${BASE_URL}/users`,
      usuario
    );
    console.log(response.data.user);
    return response.data;
  } catch (erro: any) {
    console.log(erro);
    if (erro.response.data) {
      throw new Error(erro.response.data.errors);
    }
    throw new Error("Erro ao registrar usuário. Tente novamente mais tarde.");
  }
};

export const getUser = async (token: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 5000,
    });

    return response.data.sucess;
  } catch (erro: any) {
    console.log(erro);
    if (erro.response.data) {
      throw new Error(erro.response.data.errors);
    }
    throw new Error("Erro ao registrar usuário. Tente novamente mais tarde.");
  }
};
