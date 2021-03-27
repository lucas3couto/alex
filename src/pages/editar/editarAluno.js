import React, { Component } from 'react';
import api from '../../services/services';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import './editarAluno.css';

export default class EditarAluno extends Component {

  constructor(props) {
    super(props);
    this.state = {
      aluno: {
        nome_aluno: "",
        id_turma: "",
        data_matricula: ""        
      },
      _id_turma: [],
      numero_turmas: 0,
      nome_turma: [],
      curso: [],
      cursoAtual: "",
      redirect: false
    };
  }

  async componentDidMount() {

    const { id } = this.props.match.params;
    const responseAluno = await api.get(`/alunos/${id}`);
    this.setState({
      aluno: responseAluno.data
    });

    const responseTurma = await api.get(`/turmasTotal`);
    let numero_turmas = responseTurma.data.docs.length;
    let nome_turma = [];
    let curso = [];
    let cursoAtual = "";
    let _id_turma = [];

    for(let i = 0; i < responseTurma.data.docs.length; i++) {
        if(responseAluno.data.id_turma === responseTurma.data.docs[i]["_id"]) {
            cursoAtual = responseTurma.data.docs[i]["curso"];
        }
    }

    for(let i = 0; i < numero_turmas; i++) {        
        nome_turma.push(responseTurma.data.docs[i]["nome_turma"]);
        curso.push(responseTurma.data.docs[i]["curso"]);
        _id_turma.push(responseTurma.data.docs[i]["_id"])
    }      
    
    this.setState({
        _id_turma: _id_turma,
        numero_turmas: numero_turmas,
        nome_turma: nome_turma,
        curso: curso,
        cursoAtual: cursoAtual
    });

  }

  formatDate(value) {

    if(value){
      return format(new Date(value), "dd/MM/yyyy", {locale:pt })
    }

  }

  render() {

    const { id } = this.props.match.params;
    const { redirect } = this.state;
    if (redirect) {      
      return <Redirect to={`/Aluno/${id}`} />;
    } else {
      //const { aluno } = this.state;
      return (
        <div className="content-aluno">
          <div className="card-info">
            <div className="aluno-info">
              <form onSubmit={this.handleSubmit}>
                <fieldset>
                  <div className="title">
                    <h1>Aluno: </h1>
                    <input
                      className="input-title"
                      type="text"
                      id="nome_aluno"
                      name="nome_aluno"
                      minLength="3"
                      maxLength="100"
                      required
                      value={this.state.aluno.nome_aluno}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                    />
                  </div>
                  <p className="info">Curso: 
                    <select name="cursos" className="cursos" onClick={this.handleComboboxChange}>
                        {
                            this.state.curso.map((elem, index) => {
                                return elem === this.state.cursoAtual ?
                                    <option
                                        className="cursos-options"
                                        value={index}
                                        name="id_turma" 
                                        selected
                                    >
                                        {elem}
                                    </option> :
                                    <option
                                        className="cursos-options"
                                        value={index}
                                        name="id_turma"                   
                                    >
                                        {elem}
                                    </option>
                            })
                        }  
                    </select>
                  </p>
                  <p className="info">Data matrícula: <input
                    className="input-info-date"
                    type="date"
                    id="data_matricula"
                    name="data_matricula"
                    required
                    value={this.state.aluno.data_matricula}
                    onChange={this.handleInputChange}
                  />
                  </p>
                  <div className="btn-place">
                    <Link className="btn-details" to={`/Aluno/${id}`}><i className="fas fa-undo"></i></Link>
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

  handleComboboxChange = event => {
      const target = event.target;
      const value = target.value;

      this.setState({
          aluno: {id_turma: this.state._id_turma[value]}
      });      
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
      aluno: { ...prevState.aluno, [name]: value }
    }));    
  }

  handleSubmit = event => {
    const { id } = this.props.match.params;
    fetch(`http://${process.env.REACT_APP_API_URL}/sistema/alunos/${id}`, {
      method: "put",
      id: id,
      body: JSON.stringify(this.state.aluno),
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