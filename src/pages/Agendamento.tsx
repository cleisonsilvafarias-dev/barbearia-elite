import { useState } from "react";
import { salvarAgendamento } from "../services/agendamentoService";
import "../styles/agendamento.css";

function Agendamento() {

  const [servico, setServico] = useState("");
  const [barbeiro, setBarbeiro] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");


  function confirmarAgendamento() {

    if (
      !nome ||
      !telefone ||
      !servico ||
      !barbeiro ||
      !data ||
      !horario
    ) {
      alert("Preencha todos os campos!");
      return;
    }


    const agendamentos = JSON.parse(
      localStorage.getItem("agendamentos") || "[]"
    );


    const existe = agendamentos.some(
      (item: any) =>
        item.barbeiro === barbeiro &&
        item.data === data &&
        item.horario === horario
    );


    if (existe) {

      alert("⚠️ Horário já ocupado!");

      return;

    }


    const novoAgendamento = {
      nome,
      telefone,
      servico,
      barbeiro,
      data,
      horario
    };


    salvarAgendamento(novoAgendamento);


    alert("✅ Agendamento confirmado!");


    setNome("");
    setTelefone("");
    setServico("");
    setBarbeiro("");
    setData("");
    setHorario("");

  }


  return (

    <div className="agendamento-container">

      <div className="agendamento-card">

        <h1>
          📅 Agendamento
        </h1>


        <h3>
          ✂ Serviço
        </h3>

        <select
          value={servico}
          onChange={(e) => setServico(e.target.value)}
        >

          <option value="">
            Selecione
          </option>

          <option value="Corte Masculino">
            Corte Masculino - R$35
          </option>

          <option value="Barba">
            Barba - R$25
          </option>

          <option value="Corte + Barba">
            Corte + Barba - R$55
          </option>

        </select>


        <h3>
          💈 Barbeiro
        </h3>

        <select
          value={barbeiro}
          onChange={(e) => setBarbeiro(e.target.value)}
        >

          <option value="">
            Selecione
          </option>

          <option value="João">
            João
          </option>

          <option value="Carlos">
            Carlos
          </option>

          <option value="Pedro">
            Pedro
          </option>

        </select>


        <h3>
          📅 Data
        </h3>

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />


        <h3>
          ⏰ Escolha o horário
        </h3>

        <div className="horarios">

          <button
            className={
              horario === "08:00"
                ? "selecionado"
                : ""
            }
            onClick={() => setHorario("08:00")}
          >
            08:00
          </button>


          <button
            className={
              horario === "09:00"
                ? "selecionado"
                : ""
            }
            onClick={() => setHorario("09:00")}
          >
            09:00
          </button>


          <button
            className={
              horario === "10:00"
                ? "selecionado"
                : ""
            }
            onClick={() => setHorario("10:00")}
          >
            10:00
          </button>

        </div>


        <p className="horario-escolhido">
          Horário escolhido:{" "}
          <strong>
            {horario || "Nenhum"}
          </strong>
        </p>


        <h3>
          👤 Seus dados
        </h3>


        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />


        <input
          type="tel"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />


        <button
          className="confirmar"
          onClick={confirmarAgendamento}
        >
          Confirmar Agendamento
        </button>

      </div>

    </div>

  );

}


export default Agendamento;