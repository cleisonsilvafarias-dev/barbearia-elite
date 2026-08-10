type CardServicoProps = {
  nome: string;
  preco: string;
};

function CardServico({ nome, preco }: CardServicoProps) {

  function agendar() {
    alert(`Você escolheu: ${nome}`);
  }

  return (
    <div className="card">
      <h3>{nome}</h3>

      <p>{preco}</p>

      <button onClick={agendar}>
        Agendar
      </button>
    </div>
  );
}

export default CardServico;