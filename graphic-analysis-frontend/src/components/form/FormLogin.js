import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import React, { useState, useContext } from "react";
import { Stack, TextField, Button, Divider } from "@mui/material";

import { baseUrl } from "../../config/api";
import { LoginContext } from "../../context/LoginContext";

import "react-toastify/dist/ReactToastify.css";
import styles from "../../pages/signIn/styles.module.css";

const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(LoginContext);

  async function handleLogin(event) {
    event.preventDefault();
    toast("Autenticação está sendo validada");

    try {
      const response = await fetch(
        `${baseUrl}login`,
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const { token, message } = data;

      setToken(token);

      if (response.status === 200) {
        toast.success("Login efetuado com sucesso :D", message, token);
        Router.push("/dashboard");
      } else if (response.status === 401) {
        toast.error("Senha ou Username incorreto :(", err);
        console.log(err);
      }
    } catch (err) {
      toast.error("Algo deu errado :(", err);
      console.log(err);
    }
  }

  return (
    <>
      <Stack spacing={2}>
        <h4>Bem vindo ao Curupira</h4>
        <br />
        <TextField
          id="email-basic"
          label="Usuário"
          variant="outlined"
          className={styles.textInput}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          id="pass-basic"
          label="Senha"
          type="password"
          variant="outlined"
          className={styles.textInput}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <br />
        <Button variant="contained" onClick={handleLogin} className={styles.button}
        disabled={!username || !password || username.length < 3 || password.length < 3}>
          Entrar
        </Button>
      </Stack>

      <ToastContainer autoClose={5000} />
    </>
  );
};

export default FormLogin;
