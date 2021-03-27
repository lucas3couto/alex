import React, { Component } from 'react';
import api from '../../services/services';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './insertAluno.css';

export default class InsertAluno extends Component {

  constructor(props) {
    super(props);
    this.state = {
      aluno: {
        nome_aluno: "",
        id_turma: "",
        data_matricula: ""        
      },
      turma: {
        nome_turma: "",
        curso: "",
        alunos: [],
        data_inicio: ""
      },
      _id_turma: [],
      numero_turmas: 0,
      nome_turma: [],
      curso: [],
      cursoAtual: "",
      index: "",
      ctrl: 0,
      turmas: [],
      redirect: false
    };
  }

  async componentDidMount() {

    const responseTurma = await api.get(`/turmasTotal`);
    let numero_turmas = responseTurma.data.docs.length;
    let nome_turma = [];
    let curso = [];
    let _id_turma = [];

    for(let i = 0; i < numero_turmas; i++) {        
        nome_turma.push(responseTurma.data.docs[i]["nome_turma"]);
        curso.push(responseTurma.data.docs[i]["curso"]);
        _id_turma.push(responseTurma.data.docs[i]["_id"])
    }      
    
    this.setState({
        turmas: responseTurma.data.docs,
        _id_turma: _id_turma,
        numero_turmas: numero_turmas,
        nome_turma: nome_turma,
        curso: curso,
        cursoAtual: curso[0]
    });

  }

  render() {

    const { redirect } = this.state;
    if (redirect) {      
      return <Redirect to={`/TelaAlunos`} />;
    } else {
      return (
        <div className="content-aluno">
          <div className="card-info" onMouseOver={this.handleComboboxChange}>
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
                      defaultValue={this.state.aluno.nome_aluno}
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputChange}
                      onClick={this.handleInputChange}
                      autoComplete="off"
                    />
                  </div>
                  <p className="info">Curso: 
                    <select name="cursos" className="cursos" onFocus={this.handleComboboxChange} onClick={this.handleComboboxChange}>
                        {
                            this.state.curso.map((elem, index) => {
                                return elem === this.state.cursoAtual ?
                                    <option
                                        className="cursos-options"
                                        type="text"
                                        value={index}
                                        name="id_turma" 
                                        selected
                                        key={index}
                                    >
                                        {elem}
                                    </option> :
                                    <option
                                        className="cursos-options"
                                        type="text"
                                        value={index}
                                        name="id_turma"  
                                        key={index}                 
                                    >
                                        {elem}
                                    </option>
                            })

                            /*this.state.turmas.map(({_id, curso}, index) => (
                              <option
                                className="cursos-options"
                                type="text"
                                value={_id}
                                name="id_turma" 
                                selected
                                key={index}
                              >{curso}</option>
                            ))*/

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
                    <Link className="btn-details" to={`/TelaAlunos`}><i className="fas fa-undo"></i></Link>
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

      let alno = {...this.state.aluno}
      alno.id_turma = this.state._id_turma[value]
      
      if(value !== undefined && value !== "") {


        this.setState({
          aluno: alno,
          cursoAtual: this.state.curso[value],
          index: value,
          ctrl: 1
        });
      }else if(this.state.ctrl === 0){
        this.setState({
          aluno: alno,
          cursoAtual: this.state.curso[0]
        });
      }

  }

  handleInputChange = event => {
    
    const { name, value } = event.target;


    const aln = {...this.state.aluno}
    aln[name] = value

    let state = {...this.state}

    state.aluno = aln

    this.setState(state);

  }

  handleSubmit = async event => {


    try{
      await api.post('/alunos', this.state.aluno)
      this.setState({ redirect: true });

    } catch (error){
      console.log("Erro =>", error.message)
    }

    event.preventDefault();

  }

}