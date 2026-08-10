import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function Admin() {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [dataFiltro, setDataFiltro] = useState("");

  const navigate = useNavigate();

  const adminLogado = localStorage.getItem("adminLogado");

  useEffect(() => {
    if (adminLogado !== "true") {
      navigate("/login");
    }
  }, [adminLogado, navigate]);

  function carregarAgendamentos() {
    const dados = localStorage.getItem("agendamentos");

    if (dados) {
      setAgendamentos(JSON.parse(dados));
    } else {
      setAgendamentos([]);
    }
  }

  useEffect(() => {
    if (adminLogado === "true") {
      carregarAgendamentos();
    }
  }, [adminLogado]);

  function excluirAgendamento(index: number) {
    const novaLista = agendamentos.filter(
      (_, i) => i !== index
    );

    setAgendamentos(novaLista);

    localStorage.setItem(
      "agendamentos",
      JSON.stringify(novaLista)
    );
  }

  function alterarStatus(
    index: number,
    novoStatus: string
  ) {
    const novaLista = [...agendamentos];

    novaLista[index] = {
      ...novaLista[index],
      status: novoStatus
    };

    setAgendamentos(novaLista);

    localStorage.setItem(
      "agendamentos",
      JSON.stringify(novaLista)
    );
  }

  function abrirWhatsApp(
    telefone: string,
    nome: string
  ) {
    const numero = telefone.replace(/\D/g, "");

    const mensagem = encodeURIComponent(
      `Olá ${nome}! Aqui é da Barbearia Elite. Estamos entrando em contato sobre seu agendamento.`
    );

    window.open(
      `https://wa.me/55${numero}?text=${mensagem}`,
      "_blank"
    );
  }

  function sair() {
    localStorage.removeItem("adminLogado");
    navigate("/login");
  }

  function formatarData(data: string) {
    if (!data) {
      return "";
    }

    return data.replace(/-/g, "/");
  }

  const totalAgendamentos =
    agendamentos.length;

  const pendentes =
    agendamentos.filter(
      (item) =>
        !item.status ||
        item.status === "Pendente"
    ).length;

  const confirmados =
    agendamentos.filter(
      (item) =>
        item.status === "Confirmado"
    ).length;

  const finalizados =
    agendamentos.filter(
      (item) =>
        item.status === "Finalizado"
    ).length;

  const agendamentosFiltrados =
    dataFiltro
      ? agendamentos.filter(
          (item) =>
            item.data === dataFiltro
        )
      : agendamentos;

  if (adminLogado !== "true") {
    return null;
  }

  return (
    <div className="admin-container">

      <h1>
        ⚙️ Painel Administrativo
      </h1>

      <button
        className="sair"
        onClick={sair}
      >
        🚪 Sair
      </button>


      <div className="dashboard">

        <div className="dashboard-card">

          <span>
            📅
          </span>

          <strong>
            {totalAgendamentos}
          </strong>

          <p>
            Total
          </p>

        </div>


        <div className="dashboard-card pendente">

          <span>
            🟡
          </span>

          <strong>
            {pendentes}
          </strong>

          <p>
            Pendentes
          </p>

        </div>


        <div className="dashboard-card confirmado">

          <span>
            🟢
          </span>

          <strong>
            {confirmados}
          </strong>

          <p>
            Confirmados
          </p>

        </div>


        <div className="dashboard-card finalizado">

          <span>
            🔵
          </span>

          <strong>
            {finalizados}
          </strong>

          <p>
            Finalizados
          </p>

        </div>

      </div>


      <div className="filtro-data">

        <h2>
          📅 Filtrar por data
        </h2>

        <input
          type="date"
          value={dataFiltro}
          onChange={(e) =>
            setDataFiltro(e.target.value)
          }
        />

        {dataFiltro && (

          <button
            className="limpar-filtro"
            onClick={() =>
              setDataFiltro("")
            }
          >
            Mostrar todos
          </button>

        )}

      </div>


      <h2 className="titulo-agendamentos">

        {dataFiltro
          ? `Agendamentos de ${formatarData(
              dataFiltro
            )}`
          : "Todos os agendamentos"}

      </h2>


      {agendamentosFiltrados.length === 0 ? (

        <p className="nenhum">

          {dataFiltro
            ? "Nenhum agendamento encontrado para esta data."
            : "Nenhum agendamento encontrado."}

        </p>

      ) : (

        agendamentosFiltrados.map(
          (agendamento) => {

            const indexOriginal =
              agendamentos.indexOf(
                agendamento
              );

            return (

              <div
                className="agendamento-card-admin"
                key={indexOriginal}
              >

                <p>
                  👤 Cliente: {agendamento.nome}
                </p>

                <p>
                  📱 Telefone:{" "}
                  {agendamento.telefone}
                </p>

                <p>
                  ✂ Serviço:{" "}
                  {agendamento.servico}
                </p>

                <p>
                  💈 Barbeiro:{" "}
                  {agendamento.barbeiro}
                </p>

                <p>
                  📅 Data:{" "}
                  {formatarData(
                    agendamento.data
                  )}
                </p>

                <p>
                  ⏰ Horário:{" "}
                  {agendamento.horario}
                </p>

                <p>
                  📌 Status:
                </p>

                <select
                  className="status-select"
                  value={
                    agendamento.status ||
                    "Pendente"
                  }
                  onChange={(e) =>
                    alterarStatus(
                      indexOriginal,
                      e.target.value
                    )
                  }
                >

                  <option value="Pendente">
                    🟡 Pendente
                  </option>

                  <option value="Confirmado">
                    🟢 Confirmado
                  </option>

                  <option value="Finalizado">
                    🔵 Finalizado
                  </option>

                </select>


                <button
                  className="whatsapp"
                  onClick={() =>
                    abrirWhatsApp(
                      agendamento.telefone,
                      agendamento.nome
                    )
                  }
                >
                  💬 Chamar no WhatsApp
                </button>


                <button
                  className="excluir"
                  onClick={() =>
                    excluirAgendamento(
                      indexOriginal
                    )
                  }
                >
                  🗑 Excluir Agendamento
                </button>

              </div>

            );
          }
        )

      )}

    </div>
  );
}

export default Admin;