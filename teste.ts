import { getUser } from "./src/services/authService";


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmRyZWVtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTc0MzU0OTkwNywiZXhwIjoxNzQzNTQ5OTY3fQ.Ox4TVWH_XBPtuuoSLFzFiZHtb44Exz1mt-Ugiu8eAHc"
getUser(token)
  .then((data) => console.log( data))
  .catch((error) => console.error("Erro ao buscar usuário:", error));
