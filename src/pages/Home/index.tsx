import React from "react";
import ToDoList from "../To-do-list";
import { useAuth } from "../../Context/AuthContext.tsx";
import LandingPage from "../../components/landing";

const Home: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <ToDoList /> : <LandingPage />}</>;
};

export default Home;
