import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { register, login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext.tsx";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background-color: #f5f5f5;
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  background: #f9f9f9;

  svg {
    margin-right: 0.5rem;
    color: #888;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  background: transparent;
  font-size: 1rem;
`;

const Button = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const ToggleLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ConfirmationMessage = () => (
  <div style={{ textAlign: "center", color: "#28a745" }}>
    Registro realizado com sucesso! Redirecionando...
  </div>
);

const SuccessMessage: React.FC = () => (
  <div style={{ textAlign: "center", color: "#28a745", marginTop: "1rem" }}>
    <h3>Login realizado com sucesso!</h3>
    <p>Você será redirecionado para a página inicial.</p>
  </div>
);

const LoginRegisterForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth(); // <-- aqui usamos o contexto

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (location.state && location.state.isRegister !== undefined) {
      setIsRegister(location.state.isRegister);
    }
  }, [location.state]);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        await register({ name, email, password });
        setName("");
        setEmail("");
        setPassword("");
        setShowConfirmation(true);

        const response = await loginService({ email, password });
        auth.login(response.token); // Usando o contexto
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        const response = await loginService({ email, password });
        auth.login(response.token); // Usando o contexto
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao processar a solicitação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        {showConfirmation ? (
          <ConfirmationMessage />
        ) : showSuccessMessage ? (
          <SuccessMessage />
        ) : (
          <>
            <Title>{isRegister ? "Registrar" : "Login"}</Title>
            <Form onSubmit={handleSubmit}>
              {isRegister && (
                <InputGroup>
                  <FaUser />
                  <Input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </InputGroup>
              )}
              <InputGroup>
                <FaEnvelope />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
              <InputGroup>
                <FaLock />
                <Input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? "Carregando..." : isRegister ? "Registrar" : "Login"}
              </Button>
            </Form>
            <ToggleLink onClick={toggleForm}>
              {isRegister
                ? "Já possui uma conta? Fazer login"
                : "Não possui uma conta? Criar conta"}
            </ToggleLink>
          </>
        )}
      </FormWrapper>
    </Container>
  );
};

export default LoginRegisterForm;
