import axios from "axios";





export const getUser = async (token: string): Promise<any> => { 
    try {
      const response = await axios.get("http://192.168.0.108:3000/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data;
    } catch (erro: any) { 
      // Se a API retornou uma mensagem de erro no JSON:
      console.log(erro);
      if (erro.response.data) {
        throw new Error(erro.response.data.errors); // propaga a mensagem para o componente
      }
      throw new Error("Erro ao registrar usuário. Tente novamente mais tarde.");
    }
  
  }