import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/admin.css";

function Admin() {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [dataFiltro, setDataFiltro] = useState("");
  const [carregando, setCarregando] = useState(true);

  const navigate = useNavigate();

  const adminLogado = localStorage.getItem("adminLogado");

  // Verifica se o administrador está logado
  useEffect(() => {
    if (adminLogado !== "true") {
      navigate("/login");
    }
  }, [adminLogado, navigate]);

  // Carrega os agendamentos do Supabase
  async function carregarAgendamentos() {
    try {
      setCarregando(true);

      const { data, error } = await supabase
        .from("agendamentos")
        .select("*")
        .order("data", { ascending: true })
        .order("horario", { ascending: true });

      if (error) {
        console.error(
          "Erro ao carregar agendamentos:",
          error
        );

        alert(
          "❌ Erro ao carregar os agendamentos:\n\n" +
            error.message
        );

        return;
      }

      setAgendamentos(data || []);
    } catch (error: any) {
      console.error(
        "Erro inesperado:",
        error
      );

      alert(
        "❌ Erro inesperado:\n\n" +
          (error?.message || "Erro desconhecido.")
      );
    } finally {
      setCarregando(false);
    }
  }

  // Carrega os agendamentos quando o Admin estiver logado
  useEffect(() => {
    if (adminLogado === "true") {
      carregarAgendamentos();
    }
  }, [adminLogado]);

  // Excluir agendamento do Supabase
  async function excluirAgendamento(id: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este agendamento?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const { error } = await supabase
        .from("agendamentos")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(
          "Erro ao excluir agendamento:",
          error
        );

        alert(
          "❌ Não foi possível excluir o agendamento:\n\n" +
            error.message
        );

        return;
      }

      // Remove da tela sem precisar recarregar
      setAgendamentos((listaAtual) =>
        listaAtual.filter(
          (agendamento) =>
            agendamento.id !== id
        )
      );

      alert("🗑 Agendamento excluído!");
    } catch (error: any) {
      console.error(
        "Erro inesperado ao excluir:",
        error
      );

      alert(
        "❌ Erro ao excluir:\n\n" +
          (error?.message || "Erro desconhecido.")
      );
    }
  }

  // Alterar status no Supabase
  async function alterarStatus(
    id: number,
    novoStatus: string
  ) {
    try {
      const { error } = await supabase
        .from("agendamentos")
        .update({
          status: novoStatus,
        })
        .eq("id", id);

      if (error) {
        console.error(
          "Erro ao alterar status:",
          error
        );

        alert(
          "❌ Não foi possível alterar o status:\n\n" +
            error.message
        );

        return;
      }

      // Atualiza o status na tela
      setAgendamentos((listaAtual) =>
        listaAtual.map((agendamento) =>
          agendamento.id === id
            ? {
                ...agendamento,
                status: novoStatus,
              }
            : agendamento
        )
      );
    } catch (error: any) {
      console.error(
        "Erro inesperado ao alterar status:",
        error
      );

      alert(
        "❌ Erro ao alterar status:\n\n" +
          (error?.message || "Erro desconhecido.")
      );
    }
  }

  // Abrir WhatsApp
  function abrirWhatsApp(
    telefone: string,
    nome: string
  ) {
    const numero = telefone.replace(
      /\D/g,
      ""
    );

    const mensagem = encodeURIComponent(
      `Olá ${nome}! Aqui é da Barbearia Elite. Estamos entrando em contato sobre seu agendamento.`
    );

    window.open(
      `https://wa.me/55${numero}?text=${mensagem}`,
      "_blank"
    );
  }

  // Sair do Admin
  function sair() {
    localStorage.removeItem("adminLogado");
    navigate("/login");
  }

  // Formata a data
  function formatarData(data: string) {
    if (!data) {
      return "";
    }

    return data.replace(/-/g, "/");
  }

  // Total de agendamentos
  const totalAgendamentos =
    agendamentos.length;

  // Pendentes
  // Aceita tanto "pendente" quanto "Pendente"
  const pendentes =
    agendamentos.filter(
      (item) =>
        !item.status ||
        item.status.toLowerCase() ===
          "pendente"
    ).length;

  // Confirmados
  const confirmados =
    agendamentos.filter(
      (item) =>
        item.status?.toLowerCase() ===
        "confirmado"
    ).length;

  // Finalizados
  const finalizados =
    agendamentos.filter(
      (item) =>
        item.status?.toLowerCase() ===
        "finalizado"
    ).length;

  // Filtro por data
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
            setDataFiltro(
              e.target.value
            )
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

      {carregando ? (

        <p className="nenhum">
          ⏳ Carregando agendamentos...
        </p>

      ) : agendamentosFiltrados.length === 0 ? (

        <p className="nenhum">

          {dataFiltro
            ? "Nenhum agendamento encontrado para esta data."
            : "Nenhum agendamento encontrado."}

        </p>

      ) : (

        agendamentosFiltrados.map(
          (agendamento) => (

            <div
              className="agendamento-card-admin"
              key={agendamento.id}
            >

              <p>
                👤 Cliente:{" "}
                {agendamento.nome}
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
                  agendamento.status
                    ? agendamento.status
                        .charAt(0)
                        .toUpperCase() +
                      agendamento.status.slice(1)
                    : "Pendente"
                }
                onChange={(e) =>
                  alterarStatus(
                    agendamento.id,
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
                    agendamento.id
                  )
                }
              >
                🗑 Excluir Agendamento
              </button>

            </div>

          )
        )

      )}

    </div>
  );
}

export default Admin;