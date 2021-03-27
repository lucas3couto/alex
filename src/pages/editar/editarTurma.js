import React, { Component } from 'react';
import api from '../../services/services';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './editarTurma.css';

export default class EditarTurma extends Component {

  constructor(props) {
    super(props);
    this.state = {
      turma: {
        nome_turma: "",
        curso: "",
        alunos: [],
        data_inicio: ""
      },
      redirect: false
    };
  }

  async componentDidMount() {

    const { id } = this.props.match.params;
    const response = await api.get(`/turmas/${id}`);
    this.setState({
      turma: response.data
    });

  }

  render() {

    const { id } = this.props.match.params;
    const { redirect } = this.state;
    if (redirect) {      
      return <Redirect to={`/Turma/${id}`} />;
    } else {
      //const { turma } = this.state;
      return (
        <div className="content-turma">
          <div className="card-info">
            <div className="turma-info">
              <form onSubmit={this.handleSubmit}>
                <fieldset>
                  <div className="title">
                    <h1>Turma: </h1>
                    <input
                      className="input-title"
                      type="text"
                      id="nome_turma"
                      name="nome_turma"
                      minLength="3"
                      maxLength="100"
                      required
                      value={this.state.turma.nome_turma}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                    />
                  </div>
                  <p className="info">Curso: <input
                    className="input-info"
                    type="text"
                    id="curso"
                    name="curso"
                    minLength="3"
                    maxLength="100"
                    required
                    value={this.state.turma.curso}
                    onChange={this.handleInputChange}
                    autoComplete="off"
                  />
                  </p>
                  <p className="info">Data início: <input
                    className="input-info-date"
                    type="date"
                    id="data_inicio"
                    name="data_inicio"
                    required
                    value={this.state.turma.data_inicio}
                    onChange={this.handleInputChange}
                  />
                  </p>
                  <div className="btn-place">
                    <Link className="btn-details" to={`/Turma/${id}`}><i className="fas fa-undo"></i></Link>
                    <button type="submit" className="btn-save"><i className="fas fa-save"></i></button>                    
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>        
      );
    }

  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
      turma: { ...prevState.turma, [name]: value }
    }));
  }

  handleSubmit = event => {
    const { id } = this.props.match.params;
    fetch(`https://enigmatic-shore-43701.herokuapp.com/sistema/turmas/${id}`, {
      method: "put",
      id: id,
      body: JSON.stringify(this.state.turma),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(data => {
      if (data.ok) {
        this.setState({ redirect: true });
      }
    }).catch(erro => console.log("Erro salvar aluno: " + erro));

    event.preventDefault();
  }

}