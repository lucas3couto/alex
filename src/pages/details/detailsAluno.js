import React, { Component } from 'react';
import api from '../../services/services';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import './detailsAluno.css';

export default class DetailsAluno extends Component {


  state = {
    aluno: {
      nome_aluno: "",
      id_turma: "",
      data_matricula: "",      
    },
    turma: "",
    curso: "",    
    redirect: false
  };

  async componentDidMount() {

    const { id } = this.props.match.params;
    const responseAluno = await api.get(`/alunos/${id}`);
    this.setState({
      aluno: responseAluno.data
    });

    const responseTurma = await api.get(`/turmasTotal`);
    let obj = {};
    const arr = [];
    arr = responseTurma.data.docs.map(({_id, nome_turma, curso}) => {
      if(responseAluno.data.id_turma === _id) obj = {_id, nome_turma, curso}
    })
    
    this.setState({
        turma: obj.nome_turma,
        curso: obj.curso
    });

  }

  formatDate(value) {

    if(value){
      return format(new Date(value), "dd/MM/yyyy", {locale:pt })
    }

  }

  deleteAluno = () => {

    const { id } = this.props.match.params;

    fetch(`${process.env.REACT_APP_API_URL}/alunos/${id}`, {
      method: "delete",
    }).then(data => {
      if (data.ok) {
        this.setState({ redirect: true });
      }      
    });

  }

  render() {

    const { redirect } = this.state;
    const { aluno } = this.state;

    if (redirect) {      
      return <Redirect to={`/TelaAlunos`} />;
    } else {
      return (
        <div className="content-aluno">            
              <div className="card-info">
                <div className="title">
                <h1>Aluno: </h1>
                <h1>{aluno.nome_aluno}</h1>
                </div>
                <div className="aluno-info">
                    <p className="info">Turma: <span>{this.state.turma}</span></p>
                    <p className="info">Curso: <span>{this.state.curso}</span></p>
                    <p className="info">Data matrícula: <span>{this.formatDate(aluno.data_matricula)}</span></p>
                    <div className="btn-place">
                        <Link className="btn-details" to={`/TelaAlunos`}><i className="fas fa-undo"></i></Link>
                        <Link className="btn-details" to={`/EditarAluno/${aluno._id}`}><i className="fas fa-pen"></i></Link>
                        <button type="button" data-toggle="modal" data-target="#exampleModalCenter" className="btn-details btn-delete">
                            <i className="fas fa-trash-alt"></i>
                        </button>
                        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Excluir Aluno</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                <div className="modal-body">
                                    <p>Tem certeza que deseja excluir esse aluno?</p>
                                    <div className="alert alert-danger" role="alert">
                                        Esta ação será irreversível!
                                    </div>
                                </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.deleteAluno}>Deletar</button>
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
