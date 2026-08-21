import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-container">

      {/* =====================================
          HERO
      ====================================== */}

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
            Corte, barba e cuidado profissional
            em um ambiente pensado para você.
          </p>

          <Link
            to="/agendamento"
            className="hero-button"
          >
            Agendar horário
          </Link>

        </div>

      </section>


      {/* =====================================
          SERVIÇOS
      ====================================== */}

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


          {/* CORTE */}

          <div className="servico-card">

            <div className="servico-icon">
              ✂️
            </div>

            <h3>
              Corte Masculino
            </h3>

            <p>
              Corte profissional
              personalizado para o seu estilo.
            </p>

            <strong>
              R$ 35
            </strong>

          </div>


          {/* BARBA */}

          <div className="servico-card">

            <div className="servico-icon">
              🧔
            </div>

            <h3>
              Barba
            </h3>

            <p>
              Acabamento preciso e cuidado
              profissional.
            </p>

            <strong>
              R$ 25
            </strong>

          </div>


          {/* COMBO */}

          <div className="servico-card">

            <div className="servico-icon">
              💈
            </div>

            <h3>
              Corte + Barba
            </h3>

            <p>
              O visual completo em um único
              atendimento.
            </p>

            <strong>
              R$ 55
            </strong>

          </div>


        </div>

      </section>


      {/* =====================================
          CTA
      ====================================== */}

      <section className="cta">

        <h2>
          Pronto para renovar o visual?
        </h2>

        <p>
          Escolha seu horário e deixe o
          resto com a Barbearia Elite.
        </p>

        <Link
          to="/agendamento"
          className="cta-button"
        >
          Agendar agora
        </Link>

      </section>


      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="footer">

        <h3>
          💈 Barbearia Elite
        </h3>

        <p>
          Estilo, qualidade e praticidade.
        </p>

        <span>
          © 2026 Barbearia Elite. Todos os direitos reservados.
        </span>

      </footer>

    </div>
  );
}

export default Home;