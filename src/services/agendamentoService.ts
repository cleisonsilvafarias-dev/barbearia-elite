export function salvarAgendamento(agendamento: any) {
  const dadosAtuais = localStorage.getItem("agendamentos");

  const agendamentos = dadosAtuais
    ? JSON.parse(dadosAtuais)
    : [];

  agendamentos.push(agendamento);

  localStorage.setItem(
    "agendamentos",
    JSON.stringify(agendamentos)
  );
}