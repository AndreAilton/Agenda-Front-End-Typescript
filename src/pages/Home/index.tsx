import React from "react";
import ToDoList from "../To-do-list";
import { useAuth } from "../../context/AuthContext";
import LandingPage from "../../components/landing";

const Home: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <ToDoList /> : <LandingPage />}</>;
};

export default Home;
