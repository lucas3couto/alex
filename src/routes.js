import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from './pages/index/index';
import Turmas from './pages/turmas/turmas';
import Alunos from './pages/alunos/alunos';
import DetailsTurma from './pages/details/detailsTurma';
import DetailsAluno from './pages/details/detailsAluno';
import EditarTurma from './pages/editar/editarTurma';
import EditarAluno from './pages/editar/editarAluno';
import InsertTurma from './pages/insert/insertTurma';
import InsertAluno from './pages/insert/insertAluno';

const Routes = () => (

  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Index } />
      <Route path="/TelaTurmas/" component={ Turmas } />
      <Route path="/TelaAlunos/" component={ Alunos } />
      <Route path="/Turma/:id" component={ DetailsTurma } />
      <Route path="/Aluno/:id" component={ DetailsAluno } />
      <Route path="/EditarTurma/:id" component={ EditarTurma } />
      <Route path="/EditarAluno/:id" component={ EditarAluno } />
      <Route path="/CreateTurma" component={ InsertTurma } />
      <Route path="/CreateAluno" component={ InsertAluno } />
    </Switch>
  </BrowserRouter>

);

export default Routes;
