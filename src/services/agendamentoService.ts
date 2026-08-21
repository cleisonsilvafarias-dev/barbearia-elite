import { supabase } from "../lib/supabase";

export async function salvarAgendamento(agendamento: any) {
  const { data, error } = await supabase
    .from("agendamentos")
    .insert([
      {
        nome: agendamento.nome,
        telefone: agendamento.telefone,
        servico: agendamento.servico,
        barbeiro: agendamento.barbeiro,
        data: agendamento.data,
        horario: agendamento.horario,
        status: agendamento.status || "pendente",
      },
    ])
    .select();

  if (error) {
    console.error("Erro ao salvar agendamento:", error);
    throw error;
  }

  return data;
}