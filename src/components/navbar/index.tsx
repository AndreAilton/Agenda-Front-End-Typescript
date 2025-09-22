import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import LogoImage from "../../assets/imgs/Logo.png"; // Ajuste o caminho conforme necessário
import { useAuth } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #333; /* Cor harmoniosa com o fundo */
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    color: #007bff; /* Azul suave para hover */
    transition: color 0.3s ease;
  }
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa; /* Tom branco suave */
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra leve para destaque */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 40px; /* Tamanho consistente do logo */
  }
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05); /* Leve aumento no hover */
  }
`;

const Menu = styled.ul<{ $isOpen: boolean }>`
  display: flex;
  list-style: none;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    display: ${({ $isOpen }) =>
      $isOpen ? "flex" : "none"}; /* Mostra ou oculta o menu */
  }
`;

const MenuItem = styled.li`
  width: auto; /* Padrão para desktop */

  @media (max-width: 768px) {
    width: 60%; /* Ocupa todo o espaço disponível no mobile */
  }

  a {
    text-decoration: none;
    color: #333;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    background-color: transparent;
    transition: all 0.3s ease;
    display: flex; /* Garante que o link ocupe toda a largura do MenuItem */

    &:hover {
      color: #fff;
      background-color: #007bff; /* Azul suave para hover */
      transform: scale(1.05); /* Leve aumento no hover */
    }
  }
`;

const MobileIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const [$isOpen, setIsOpen] = React.useState(false);
  const { isLoggedIn, logout } = useAuth(); // aqui vem do contexto
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!$isOpen);
  };

  const toggleMenu2 = () => {
    setIsOpen(false);
  };

  if (isLoggedIn === undefined) {
    return null; // Não renderiza nada enquanto o estado não é carregado
  }

  return (
    <div>
      {isLoggedIn ? (
        <NavbarContainer>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              gap: "1rem",
              justifyContent: "space-between",
            }}
          >
            <StyledLink to="/">
              <Logo>
                <img src={LogoImage} alt="Logo" />
              </Logo>
            </StyledLink>

            <MobileIcon onClick={toggleMenu}>
              <FaBars />
            </MobileIcon>
          </div>

          <Menu $isOpen={$isOpen}>
            <MenuItem>
              <StyledLink to="/Perfil">Perfil</StyledLink>
            </MenuItem>

            <MenuItem>
              <StyledLink
                to="/"
                onClick={() => {
                  navigate("/"), logout();
                }}
              >
                <FaUser />
                Sair
              </StyledLink>
            </MenuItem>
          </Menu>
        </NavbarContainer>
      ) : (
        <NavbarContainer>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              gap: "1rem",
              justifyContent: "space-between",
            }}
          >
            <StyledLink to="/">
              <Logo>
                <img src={LogoImage} alt="Logo" />
              </Logo>
            </StyledLink>

            <MobileIcon onClick={toggleMenu}>
              <FaBars />
            </MobileIcon>
          </div>

          <Menu $isOpen={$isOpen}>
            <MenuItem>
              <StyledLink
                to="/Auth"
                onClick={toggleMenu2}
                state={{ isRegister: false }}
              >
                <FaUser />
                Entrar
              </StyledLink>
            </MenuItem>

            <MenuItem>
              <StyledLink
                to="/Auth"
                onClick={toggleMenu2}
                state={{ isRegister: true }}
              >
                <FaUser />
                Cadastre-se
              </StyledLink>
            </MenuItem>
          </Menu>
        </NavbarContainer>
      )}
    </div>
  );
};

export default Navbar;
