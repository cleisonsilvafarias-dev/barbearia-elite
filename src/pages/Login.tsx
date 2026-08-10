import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  const navigate = useNavigate();


  function entrar() {

    setErro("");

    if (!usuario || !senha) {
      setErro("Preencha usuário e senha.");
      return;
    }


    if (
      usuario === "admin" &&
      senha === "123456"
    ) {

      localStorage.setItem(
        "adminLogado",
        "true"
      );

      navigate("/admin");

      return;

    }


    setErro(
      "Usuário ou senha incorretos."
    );

  }


  return (

    <div className="login-container">

      <div className="login-card">


        <div className="login-logo">
          💈
        </div>


        <h1>
          Barbearia Elite
        </h1>


        <p className="login-subtitulo">
          Acesso administrativo
        </p>


        <label>
          Usuário
        </label>


        <input
          type="text"
          placeholder="Digite seu usuário"
          value={usuario}
          onChange={(e) =>
            setUsuario(e.target.value)
          }
        />


        <label>
          Senha
        </label>


        <div className="senha-container">

          <input
            type={
              mostrarSenha
                ? "text"
                : "password"
            }
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
          />


          <button
            type="button"
            className="mostrar-senha"
            onClick={() =>
              setMostrarSenha(!mostrarSenha)
            }
          >
            {mostrarSenha
              ? "Ocultar"
              : "Mostrar"}
          </button>

        </div>


        {erro && (

          <p className="erro-login">
            ⚠️ {erro}
          </p>

        )}


        <button
          className="botao-login"
          onClick={entrar}
        >
          🔐 Entrar
        </button>


        <p className="login-info">
          Área exclusiva para administração
        </p>


      </div>

    </div>

  );

}


export default Login;