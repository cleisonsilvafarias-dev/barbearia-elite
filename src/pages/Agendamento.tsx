import { useEffect, useState } from "react";
import { salvarAgendamento } from "../services/agendamentoService";
import { supabase } from "../lib/supabase";
import "../styles/agendamento.css";

function Agendamento() {
  const [servico, setServico] = useState("");
  const [barbeiro, setBarbeiro] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const [carregandoHorarios, setCarregandoHorarios] = useState(false);
  const [salvando, setSalvando] = useState(false);

  // Horários disponíveis
  const horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  // Busca os horários ocupados
  async function carregarHorariosOcupados() {
    if (!data || !barbeiro) {
      setHorariosOcupados([]);
      return;
    }

    try {
      setCarregandoHorarios(true);

      const { data: agendamentos, error } = await supabase
        .from("agendamentos")
        .select("horario")
        .eq("barbeiro", barbeiro)
        .eq("data", data);

      if (error) {
        console.error(
          "Erro ao carregar horários:",
          error
        );

        setHorariosOcupados([]);
        return;
      }

      const ocupados = (agendamentos || []).map(
        (item) => item.horario
      );

      setHorariosOcupados(ocupados);

      // Se o horário anteriormente selecionado ficou ocupado
      if (horario && ocupados.includes(horario)) {
        setHorario("");
      }
    } catch (error) {
      console.error(
        "Erro inesperado ao carregar horários:",
        error
      );

      setHorariosOcupados([]);
    } finally {
      setCarregandoHorarios(false);
    }
  }

  // Atualiza horários quando muda barbeiro ou data
  useEffect(() => {
    carregarHorariosOcupados();
  }, [data, barbeiro]);

  async function confirmarAgendamento() {
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

    if (horariosOcupados.includes(horario)) {
      alert("⚠️ Este horário já está ocupado!");
      return;
    }

    try {
      setSalvando(true);

      // Verificação final antes de salvar
      const { data: existente, error: erroConsulta } =
        await supabase
          .from("agendamentos")
          .select("id")
          .eq("barbeiro", barbeiro)
          .eq("data", data)
          .eq("horario", horario)
          .limit(1);

      if (erroConsulta) {
        console.error(
          "Erro ao verificar horário:",
          erroConsulta
        );

        alert(
          "❌ Erro ao verificar horário:\n\n" +
            erroConsulta.message
        );

        return;
      }

      if (existente && existente.length > 0) {
        alert("⚠️ Horário já ocupado!");

        await carregarHorariosOcupados();

        return;
      }

      const novoAgendamento = {
        nome,
        telefone,
        servico,
        barbeiro,
        data,
        horario,
        status: "pendente",
      };

      await salvarAgendamento(novoAgendamento);

      alert("✅ Agendamento confirmado!");

      setNome("");
      setTelefone("");
      setServico("");
      setHorario("");

      await carregarHorariosOcupados();
    } catch (error: any) {
      console.error(
        "ERRO AO REALIZAR AGENDAMENTO:",
        error
      );

      alert(
        "❌ Não foi possível realizar o agendamento.\n\n" +
          (error?.message || "Erro desconhecido.")
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="agendamento-container">

      <div className="agendamento-card">

        <div className="agendamento-header">

          <span className="agendamento-label">
            BARBEARIA ELITE
          </span>

          <h1>
            Agende seu horário
          </h1>

          <p>
            Escolha o serviço, barbeiro,
            data e horário.
          </p>

        </div>


        {/* SERVIÇO */}

        <div className="campo">

          <label>
            Serviço
          </label>

          <select
            value={servico}
            onChange={(e) =>
              setServico(e.target.value)
            }
          >

            <option value="">
              Selecione o serviço
            </option>

            <option value="Corte Masculino">
              Corte Masculino — R$ 35
            </option>

            <option value="Barba">
              Barba — R$ 25
            </option>

            <option value="Corte + Barba">
              Corte + Barba — R$ 55
            </option>

          </select>

        </div>


        {/* BARBEIRO */}

        <div className="campo">

          <label>
            Barbeiro
          </label>

          <select
            value={barbeiro}
            onChange={(e) => {
              setBarbeiro(e.target.value);
              setHorario("");
            }}
          >

            <option value="">
              Selecione o barbeiro
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

        </div>


        {/* DATA */}

        <div className="campo">

          <label>
            Data
          </label>

          <input
            type="date"
            value={data}
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            onChange={(e) => {
              setData(e.target.value);
              setHorario("");
            }}
          />

        </div>


        {/* HORÁRIOS */}

        <div className="campo">

          <label>
            Horário
          </label>

          {!barbeiro || !data ? (

            <div className="aviso-horario">
              Selecione o barbeiro e a data
              para visualizar os horários.
            </div>

          ) : carregandoHorarios ? (

            <div className="carregando-horarios">
              Consultando horários...
            </div>

          ) : (

            <div className="horarios">

              {horarios.map((hora) => {

                const ocupado =
                  horariosOcupados.includes(
                    hora
                  );

                const selecionado =
                  horario === hora;

                return (

                  <button
                    type="button"
                    key={hora}
                    disabled={ocupado}
                    className={`
                      ${selecionado ? "selecionado" : ""}
                      ${ocupado ? "ocupado" : ""}
                    `}
                    onClick={() =>
                      !ocupado &&
                      setHorario(hora)
                    }
                  >

                    {hora}

                    {ocupado && (
                      <small>
                        Ocupado
                      </small>
                    )}

                  </button>

                );
              })}

            </div>

          )}

        </div>


        {/* LEGENDA */}

        {barbeiro && data && !carregandoHorarios && (

          <div className="legenda-horarios">

            <span>
              <i className="disponivel"></i>
              Disponível
            </span>

            <span>
              <i className="ocupado-legenda"></i>
              Ocupado
            </span>

          </div>

        )}


        {/* DADOS */}

        <div className="dados-titulo">
          Seus dados
        </div>


        <div className="campo">

          <label>
            Nome
          </label>

          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
          />

        </div>


        <div className="campo">

          <label>
            Telefone
          </label>

          <input
            type="tel"
            placeholder="Digite seu telefone"
            value={telefone}
            onChange={(e) =>
              setTelefone(e.target.value)
            }
          />

        </div>


        {/* RESUMO */}

        {horario && (

          <div className="resumo">

            <span>
              Horário escolhido
            </span>

            <strong>
              {horario}
            </strong>

          </div>

        )}


        {/* BOTÃO */}

        <button
          type="button"
          className="confirmar"
          disabled={salvando}
          onClick={confirmarAgendamento}
        >

          {salvando
            ? "Confirmando..."
            : "Confirmar Agendamento"}

        </button>

      </div>

    </div>
  );
}

export default Agendamento;