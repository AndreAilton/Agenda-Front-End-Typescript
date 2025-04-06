import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserTasks,
  deleteUserTask,
  createUserTask,
  alterUserTask,
  getUserCategorys,
  createUserCategory,
  deleteUserCategory,
} from "../../services/userServices";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 2rem 1rem; /* Adiciona espaçamento ao redor */
`;

const ListWrapper = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const TaskListWrapper = styled.div``;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TaskItem = styled.li<{ done: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: ${({ done }) => (done ? "#d4edda" : "#f9f9f9")};
  color: ${({ done }) => (done ? "#155724" : "#333")};
  transition: background 0.3s;

  &:hover {
    background: ${({ done }) => (done ? "#c3e6cb" : "#e9ecef")};
  }
`;

const TaskDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskTitle = styled.h3<{ done: boolean }>`
  margin: 0;
  font-size: 1.2rem;
  text-decoration: ${({ done }) => (done ? "line-through" : "none")};
`;

const TaskDescription = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: #666;
`;

const TaskCategory = styled.span`
  font-size: 0.8rem;
  color: #007bff;
`;

const TaskDate = styled.span`
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  margin-bottom: 1rem;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const ModalTitle = styled.h3`
  margin-bottom: 1rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const CategoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f9f9f9;
  color: #333;
  transition: background 0.3s;

  &:hover {
    background: #e9ecef;
  }
`;

const DeleteButton = styled(Button)`
  background: #dc3545;

  &:hover {
    background: #c82333;
  }
`;

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    tittle: "",
    description: "",
    category: "",
  });
  const [editTask, setEditTask] = useState<any>(null);
  const [formErrors, setFormErrors] = useState({
    tittle: "",
    description: "",
    category: "",
  });

  // Estados para filtros
  const [filterCategory, setFilterCategory] = useState<string>(""); // Categoria selecionada
  const [sortOrder, setSortOrder] = useState<string>("asc"); // Ordem de exibição (ascendente ou descendente)

  const [categories, setCategories] = useState<string[]>([]); // Lista de categorias
  const [newCategory, setNewCategory] = useState(""); // Nova categoria
  const [isManageCategoriesModalOpen, setIsManageCategoriesModalOpen] =
    useState(false);

  // Função para buscar as tarefas do usuário
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado.");
      setLoading(false);
      return;
    }

    try {
      const data = await getUserTasks(token);
      setTasks(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar as tarefas.");
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir uma tarefa
  const handleDeleteTask = async (taskId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado.");
      return;
    }

    try {
      await deleteUserTask(token, taskId);
      const data = await getUserTasks(token);
      setTasks(data);
    } catch (err: any) {
      setError(err.message || "Erro ao excluir a tarefa.");
    }
  };

  // Função para criar uma nova tarefa
  const handleCreateTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado.");
      return;
    }

    // Validação dos campos
    const errors = {
      tittle: newTask.tittle ? "" : "O título é obrigatório.",
      description: newTask.description ? "" : "A descrição é obrigatória.",
      category: newTask.category ? "" : "A categoria é obrigatória.",
    };

    setFormErrors(errors);

    // Verifica se há erros antes de enviar
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    try {
      // Cria a tarefa e obtém os dados completos da API
       await createUserTask(token, newTask);
      // Atualiza o estado local com a nova tarefa
      fetchTasks(); // Recarrega as tarefas após a criação

      // Fecha o modal e limpa os campos
      setIsModalOpen(false);
      setNewTask({ tittle: "", description: "", category: "" });
      setFormErrors({ tittle: "", description: "", category: "" });
    } catch (err: any) {
      setFormErrors({
        ...formErrors,
        tittle: err.response?.data?.message || "Erro ao criar a tarefa.",
      });
    }
  };

  // Função para alterar uma tarefa
  const handleEditTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado.");
      return;
    }

    // Validação dos campos
    const errors = {
      tittle: editTask.tittle ? "" : "O título é obrigatório.",
      description: editTask.description ? "" : "A descrição é obrigatória.",
      category: editTask.category ? "" : "A categoria é obrigatória.",
    };

    setFormErrors(errors);

    // Verifica se há erros antes de enviar
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    try {
      await alterUserTask(token, editTask.id, editTask);
      const data = await getUserTasks(token);
      setTasks(data);
      setIsEditModalOpen(false);
      setEditTask(null);
      setFormErrors({ tittle: "", description: "", category: "" }); // Limpa os erros do formulário
    } catch (err: any) {
      setFormErrors({
        ...formErrors,
        tittle: err.response?.data?.message || "Erro ao alterar a tarefa.",
      });
    }
  };

  // Função para alternar o status de "concluído" de uma tarefa
  const toggleTaskDone = async (taskId: number, done: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado.");
      return;
    }

    try {
      // Atualiza apenas o campo "done" da tarefa
      await alterUserTask(token, taskId, { done: !done });

      // Atualiza a lista de tarefas após a alteração
      const data = await getUserTasks(token);
      setTasks(data);
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar o status da tarefa.");
    }
  };

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado.");
      return;
    }

    try {
      const data = await getUserCategorys(token);

      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar as categorias.");
    }
  };

  const handleCreateCategory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado.");
      return;
    }

    if (!newCategory.trim()) {
      setError("O nome da categoria não pode estar vazio.");
      return;
    }

    try {
      await createUserCategory(token, { category: newCategory });
      setNewCategory("");
      fetchCategories(); // Atualiza a lista de categorias
    } catch (err: any) {
      setError(err.message || "Erro ao criar a categoria.");
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado.");
      return;
    }

    try {
      await deleteUserCategory(token, categoryId);
      fetchCategories(); // Atualiza a lista de categorias após a exclusão
    } catch (err: any) {
      setError(err.message || "Erro ao excluir a categoria.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filtrar e ordenar as tarefas
  const filteredAndSortedTasks = tasks
    .filter((task) => {
      // Filtra por categoria, se uma categoria for selecionada
      return filterCategory ? task.category === filterCategory : true;
    })
    .sort((a, b) => {
      // Ordena por data de criação (ascendente ou descendente)
      if (sortOrder === "asc") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (sortOrder === "desc") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return 0;
    });

  if (loading) {
    return <Container>Carregando tarefas...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <Container>
      <ListWrapper>
        <Title>Minha To-Do List</Title>

        {/* Filtros */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          {/* Filtro por Categoria */}
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Todas as Categorias</option>
            {[...new Set(tasks.map((task) => task.category))].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
          </Select>

          {/* Filtro por Ordem */}
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ordem Crescente</option>
            <option value="desc">Ordem Decrescente</option>
          </Select>
        </div>

        <Button onClick={() => {setIsModalOpen(true); fetchCategories()}}>Criar Nova Tarefa</Button>
        <Button
          onClick={() => {
            setIsManageCategoriesModalOpen(true);
            fetchCategories();
          }}
        >
          Gerenciar Categorias
        </Button>
        <TaskListWrapper>
          <TaskList>
            {filteredAndSortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                done={task.done}
                onDoubleClick={() => {
                  setEditTask(task);
                  setIsEditModalOpen(true);
                }}
                onClick={() => toggleTaskDone(task.id, task.done)}
              >
                <TaskDetails>
                  <TaskTitle done={task.done}>{task.tittle}</TaskTitle>
                  <TaskDescription>{task.description}</TaskDescription>
                  <TaskCategory>{task.category}</TaskCategory>
                  <TaskDate>
                    Criado em:{" "}
                    {new Date(task.createdAt).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TaskDate>
                </TaskDetails>
                <div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTask(task.id);
                    }}
                  >
                    Excluir
                  </Button>
                </div>
              </TaskItem>
            ))}
          </TaskList>
        </TaskListWrapper>
      </ListWrapper>

      {/* Modal para criar nova tarefa */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ModalTitle>Criar Nova Tarefa</ModalTitle>
            <Input
              type="text"
              placeholder="Título"
              value={newTask.tittle}
              onChange={(e) =>
                setNewTask({ ...newTask, tittle: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Descrição"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <Select
              value={newTask.category}
              onChange={(e) =>
                setNewTask({ ...newTask, category: e.target.value })
              }
            >
              <option value="">Selecione uma Categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </Select>
            <Button onClick={handleCreateTask}>Salvar</Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Modal para editar tarefa */}
      {isEditModalOpen && editTask && (
        <ModalOverlay
          onClick={() => {
            setIsEditModalOpen(false); // Fecha o modal ao clicar no overlay
          }}
        >
          <ModalContent
            onClick={(e) => {
              e.stopPropagation(); // Previne o clique no conteúdo do modal de fechar o modal
            }}
          >
            <ModalTitle>Editar Tarefa</ModalTitle>
            {formErrors.tittle && (
              <ErrorMessage>{formErrors.tittle}</ErrorMessage>
            )}
            <Input
              type="text"
              placeholder="Título"
              value={editTask.tittle}
              onChange={(e) =>
                setEditTask({ ...editTask, tittle: e.target.value })
              }
            />
            {formErrors.description && (
              <ErrorMessage>{formErrors.description}</ErrorMessage>
            )}
            <Input
              type="text"
              placeholder="Descrição"
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
            />
            {formErrors.category && (
              <ErrorMessage>{formErrors.category}</ErrorMessage>
            )}
            <Input
              type="text"
              placeholder="Categoria"
              value={editTask.category}
              onChange={(e) =>
                setEditTask({ ...editTask, category: e.target.value })
              }
            />
            <Button onClick={handleEditTask}>Salvar</Button>
            <Button onClick={() => setIsEditModalOpen(false)}>Cancelar</Button>
          </ModalContent>
        </ModalOverlay>
      )}

      {isManageCategoriesModalOpen && (
        <ModalOverlay onClick={() => setIsManageCategoriesModalOpen(false)}>
          <ModalContent
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ModalTitle>Gerenciar Categorias</ModalTitle>
            <Input
              type="text"
              placeholder="Nova Categoria"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button onClick={handleCreateCategory}>Adicionar Categoria</Button>
            <CategoryList>
              {categories.map((category) => (
                <CategoryItem key={category.id}>
                  <span>{category.category}</span>
                  <DeleteButton onClick={() => handleDeleteCategory(category.id)}>
                    Excluir
                  </DeleteButton>
                </CategoryItem>
              ))}
            </CategoryList>
            <Button onClick={() => setIsManageCategoriesModalOpen(false)}>
              Fechar
            </Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default ToDoList;
