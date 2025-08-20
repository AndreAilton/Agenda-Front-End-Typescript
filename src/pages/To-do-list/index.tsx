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
  padding: 2rem 1rem;
`;

const ListWrapper = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }

  select {
    flex: 1;
    min-width: 0;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;

  button {
    flex: 1;
    min-width: 120px;

    @media (max-width: 480px) {
      flex: 1 1 100%;
    }
  }
`;

const TaskListWrapper = styled.div``;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TaskItem = styled.li<{ $done: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: ${({ $done }) => ($done ? "#d4edda" : "#f9f9f9")};
  color: ${({ $done }) => ($done ? "#155724" : "#333")};
  transition: background 0.3s;

  &:hover {
    background: ${({ $done }) => ($done ? "#c3e6cb" : "#e9ecef")};
  }

  @media (min-width: 480px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TaskDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  word-break: break-word;
`;

const TaskTitle = styled.h3<{ $done: boolean }>`
  margin: 0;
  font-size: 1.2rem;
  text-decoration: ${({ $done }) => ($done ? "line-through" : "none")};
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
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const DeleteButton = styled(Button)`
  background: #dc3545;

  &:hover {
    background: #c82333;
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
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 480px) {
    padding: 1rem;
    max-width: 90%;
  }
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
  margin-bottom: 1rem;
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

  const [filterCategory, setFilterCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  interface Category {
    id: number;
    category: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isManageCategoriesModalOpen, setIsManageCategoriesModalOpen] =
    useState(false);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado.");
      setLoading(false);
      return;
    }

    try {
      const data = await getUserTasks(token);
      const tasksWithDone = data.map((task: any) => ({
        ...task,
        done: task.done ?? false,
      }));
      setTasks(tasksWithDone);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar as tarefas.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return setError("Usuário não autenticado.");

    try {
      await deleteUserTask(token, taskId);
      const data = await getUserTasks(token);
      setTasks(data);
    } catch (err: any) {
      setError(err.message || "Erro ao excluir a tarefa.");
    }
  };

  const toggleTaskDone = async (taskId: number, done: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) return setError("Usuário não autenticado.");

    try {
      await alterUserTask(token, taskId, { done: !done });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, done: !done } : task
        )
      );
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar o status da tarefa.");
    }
  };

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setError("Usuário não autenticado.");

    try {
      const data = await getUserCategorys(token);
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar as categorias.");
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return setError("Usuário não autenticado.");

    try {
      await deleteUserCategory(token, categoryId);
      fetchCategories();
    } catch (err: any) {
      setError(err.message || "Erro ao excluir a categoria.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      const matchesCategory = filterCategory
        ? task.category === filterCategory
        : true;

      const matchesStatus =
        filterStatus === "all"
          ? true
          : filterStatus === "done"
          ? task.done
          : !task.done;

      return matchesCategory && matchesStatus;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  if (loading) return <Container>Carregando tarefas...</Container>;
  if (error) return <Container>{error}</Container>;

  return (
    <Container>
      <ListWrapper>
        <Title>Minha To-Do List</Title>

        <FiltersWrapper>
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

          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todas</option>
            <option value="done">Concluídas</option>
            <option value="inProgress">Em Andamento</option>
          </Select>

          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ordem Crescente</option>
            <option value="desc">Ordem Decrescente</option>
          </Select>
        </FiltersWrapper>

        <ButtonsWrapper>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              fetchCategories();
            }}
          >
            Criar Nova Tarefa
          </Button>
          <Button
            onClick={() => {
              setIsManageCategoriesModalOpen(true);
              fetchCategories();
            }}
          >
            Gerenciar Categorias
          </Button>
        </ButtonsWrapper>

        <TaskListWrapper>
          <TaskList>
            {filteredAndSortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                $done={!!task.done}
                onClick={() => toggleTaskDone(task.id, task.done)}
                onDoubleClick={() => {
                  setEditTask(task);
                  setIsEditModalOpen(true);
                }}
              >
                <TaskDetails>
                  <TaskTitle $done={!!task.done}>{task.tittle}</TaskTitle>
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

      {/* Modal Criar Tarefa */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Criar Nova Tarefa</ModalTitle>

            {formErrors.tittle && <ErrorMessage>{formErrors.tittle}</ErrorMessage>}
            <Input
              type="text"
              placeholder="Título"
              value={newTask.tittle}
              onChange={(e) =>
                setNewTask({ ...newTask, tittle: e.target.value })
              }
            />

            {formErrors.description && (
              <ErrorMessage>{formErrors.description}</ErrorMessage>
            )}
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

            <Input
              type="text"
              placeholder="Ou digite uma nova categoria"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                onClick={async () => {
                  const token = localStorage.getItem("token");
                  if (!token) return setError("Usuário não autenticado.");

                  try {
                    let categoryToUse = newTask.category;

                    if (newCategory.trim()) {
                      await createUserCategory(token, { category: newCategory });
                      categoryToUse = newCategory;
                      setNewCategory("");
                      fetchCategories();
                    }

                    await createUserTask(token, {
                      ...newTask,
                      category: categoryToUse,
                    });

                    setIsModalOpen(false);
                    setNewTask({ tittle: "", description: "", category: "" });
                    setFormErrors({ tittle: "", description: "", category: "" });
                    fetchTasks();
                  } catch (err: any) {
                    setFormErrors({
                      ...formErrors,
                      tittle: err.response?.data?.message || "Erro ao criar a tarefa.",
                    });
                  }
                }}
              >
                Salvar
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Modal Editar Tarefa */}
      {isEditModalOpen && editTask && (
        <ModalOverlay onClick={() => setIsEditModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Editar Tarefa</ModalTitle>
            {formErrors.tittle && <ErrorMessage>{formErrors.tittle}</ErrorMessage>}
            <Input
              type="text"
              placeholder="Título"
              value={editTask.tittle}
              onChange={(e) => setEditTask({ ...editTask, tittle: e.target.value })}
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
            {formErrors.category && <ErrorMessage>{formErrors.category}</ErrorMessage>}
            <Select
              value={editTask.category}
              onChange={(e) => setEditTask({ ...editTask, category: e.target.value })}
            >
              <option value="">Selecione uma Categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </Select>
            <Button onClick={async () => {
              const token = localStorage.getItem("token");
              if (!token) return setError("Usuário não autenticado.");
              try {
                await alterUserTask(token, editTask.id, editTask);
                fetchTasks();
                setIsEditModalOpen(false);
                setEditTask(null);
                setFormErrors({ tittle: "", description: "", category: "" });
              } catch (err: any) {
                setFormErrors({
                  ...formErrors,
                  tittle: err.response?.data?.message || "Erro ao alterar a tarefa.",
                });
              }
            }}>Salvar</Button>
            <Button onClick={() => setIsEditModalOpen(false)}>Cancelar</Button>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Modal Gerenciar Categorias */}
      {isManageCategoriesModalOpen && (
        <ModalOverlay onClick={() => setIsManageCategoriesModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Gerenciar Categorias</ModalTitle>
            <Input
              type="text"
              placeholder="Nova Categoria"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button
              onClick={async () => {
                const token = localStorage.getItem("token");
                if (!token) return setError("Usuário não autenticado.");

                try {
                  await createUserCategory(token, { category: newCategory });
                  setNewCategory("");
                  fetchCategories();
                } catch (err: any) {
                  setError(err.response?.data?.message || "Erro ao criar a categoria.");
                }
              }}
            >
              Adicionar
            </Button>

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

            <Button onClick={() => setIsManageCategoriesModalOpen(false)}>Fechar</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default ToDoList;
