import React, { Component } from 'react';
import api from '../../services/services';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import './detailsTurma.css';

export default class DetailsTurma extends Component {


  state = {
    turma: {
      nome_turma: "",
      curso: "",
      alunos: [],
      data_inicio: ""
    },
    redirect: false
  };

  async componentDidMount() {

    const { id } = this.props.match.params;
    const response = await api.get(`/turmas/${id}`);
    this.setState({
      turma: response.data
    });

  }

  deleteTurma = () => {

    const { id } = this.props.match.params;

    fetch(`http://localhost:3005/sistema/turmas/${id}`, {
      method: "delete",
    }).then(data => {
      if (data.ok) {
        this.setState({ redirect: true });
      }      
    });

  }

  formatDate(value) {

    if(value){
      return format(new Date(value), "dd/MM/yyyy", {locale:pt })
    }

  }

  render() {

    const { redirect } = this.state;
    const { turma } = this.state;
    if (redirect) {      
      return <Redirect to={`/TelaTurmas`} />;
    } else {
      return (
        <div className="content-turma">
          <div className="card-info">
            <div className="title">
              <h1>Turma: </h1>
              <h1>{turma.nome_turma}</h1>
            </div>
            <div className="turma-info">
              <p className="info">Curso: <span>{turma.curso}</span></p>
              <p className="info">Alunos:
                {
                  turma.alunos.map((item, index) =>
                    (index < (turma.alunos.length - 1)) ?
                      <span> {item}, </span> :
                      <span> {item}.</span>
                  )
                }
              </p>
              <p className="info">Data início: <span>{this.formatDate(turma.data_inicio)}</span></p>
              <div className="btn-place">
                <Link className="btn-details" to={`/TelaTurmas`}><i className="fas fa-undo"></i></Link>
                <Link className="btn-details" to={`/EditarTurma/${turma._id}`}><i className="fas fa-pen"></i></Link>
                <button type="button" data-toggle="modal" data-target="#exampleModalCenter" className="btn-details btn-delete">
                  <i className="fas fa-trash-alt"></i>
                </button>
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Excluir Turma</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>Tem certeza que deseja excluir essa turma?</p>
                        <div className="alert alert-danger" role="alert">
                          Esta ação será irreversível!
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.deleteTurma}>Deletar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }  

  }

}
