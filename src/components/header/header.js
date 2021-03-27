import React from 'react';
import './header.css'

const Header = () => (

  <header>
    <nav id="main-header" className="navbar navbar-expand-lg navbar-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto mt-3
        ">
          <li className="nav-item active">
            <a className="nav-link" href="/"><i className="fas fa-th-large"></i></a>
          </li>
          <li className="nav-item active">
            <p className="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Turmas
            </p>
            <div className="dropdown-menu dropdown-1" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/CreateTurma">Cadastrar</a>
              <a className="dropdown-item" href="/TelaTurmas">Visualizar</a>
            </div>
          </li>
          <li className="nav-item active">
            <p className="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Alunos
            </p>
            <div className="dropdown-menu dropdown-2" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/CreateAluno">Cadastrar</a>
              <a className="dropdown-item" href="/TelaAlunos">Visualizar</a>
            </div>
          </li>
        </ul>
      </div>
      <h1>Gerenciamento Acadêmico</h1>
    </nav>
  </header>

);

export default Header;
