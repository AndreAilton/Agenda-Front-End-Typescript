import { getUserTasks,  deleteUserTask } from "./src/services/userServices";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksImVtYWlsIjoiYW5kcmUuYWlsdG9uLjEwQGdtYWlsLmNvbSIsImlhdCI6MTc0MzYzMjc3NCwiZXhwIjoxNzQ2MjI0Nzc0fQ.5OtAB1KIPqss867GjYPgVqTzUivoXOPfQWTYmXpqs8g"
getUserTasks(token)
  .then((data) => console.log( data))
  .catch((error) => console.error("Erro ao buscar usuário:", error));

deleteUserTask(token, 1)
  .then(() => console.log("Tarefa excluída com sucesso."))
  .catch((error) => console.error("Erro ao excluir tarefa:", error));