import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-container">

      <section className="hero">

        <div className="hero-content">

          <p className="hero-subtitle">
            BARBEARIA ELITE
          </p>

          <h1>
            Seu estilo.
            <br />
            Seu momento.
          </h1>

          <p className="hero-text">
            Agende seu horário de forma rápida,
            simples e sem complicação.
          </p>

          <Link
            to="/agendamento"
            className="hero-button"
          >
            Agendar horário
          </Link>

        </div>

      </section>


      <section className="servicos">

        <div className="section-title">

          <span>
            NOSSOS SERVIÇOS
          </span>

          <h2>
            Escolha seu estilo
          </h2>

        </div>


        <div className="servicos-grid">


          <div className="servico-card">

            <div className="servico-icon">
              ✂️
            </div>

            <h3>
              Corte Masculino
            </h3>

            <p>
              Corte profissional
              personalizado.
            </p>

            <strong>
              R$ 35
            </strong>

          </div>


          <div className="servico-card">

            <div className="servico-icon">
              🧔
            </div>

            <h3>
              Barba
            </h3>

            <p>
              Acabamento e cuidado
              profissional.
            </p>

            <strong>
              R$ 25
            </strong>

          </div>


          <div className="servico-card">

            <div className="servico-icon">
              💈
            </div>

            <h3>
              Corte + Barba
            </h3>

            <p>
              O visual completo
              em um só atendimento.
            </p>

            <strong>
              R$ 55
            </strong>

          </div>


        </div>

      </section>


      <section className="cta">

        <h2>
          Pronto para renovar o visual?
        </h2>

        <p>
          Escolha seu horário e faça
          seu agendamento.
        </p>

        <Link
          to="/agendamento"
          className="cta-button"
        >
          Agendar agora
        </Link>

      </section>


      <footer className="footer">

        <h3>
          💈 Barbearia Elite
        </h3>

        <p>
          Estilo, qualidade e praticidade.
        </p>

        <span>
          © 2026 Barbearia Elite
        </span>

      </footer>

    </div>
  );
}

export default Home;