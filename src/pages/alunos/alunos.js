import React, { Component } from 'react';
import api from '../../services/services';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import './alunos.css';

export default class TelaAlunos extends Component {

    state = {
        alunos: [],
        alunosInfo: [],
        page: 1,
    };



    componentDidMount() {

        this.loadAlunos();

    }

    loadAlunos = async (page = 1) => {

        const response = await api.get(`/alunos?page=${page}`);
        const { docs, ...alunosInfo } = response.data;
        this.setState({
            alunos: docs,
            alunosInfo,
            page
        });

    }

    prevPage = () => {

        const { page } = this.state;
        if (page === 1) return;

        const pageNumber = page - 1;
        this.loadAlunos(pageNumber);

    }

    nextPage = () => {

        const { page, alunosInfo } = this.state;
        if (page === alunosInfo.page) return;

        const pageNumber = page + 1;
        this.loadAlunos(pageNumber);

    }

    formatDate(value) {

        if(value){
          return format(new Date(value), "dd/MM/yyyy", {locale:pt })
        }
    
    }

    render() {

        //const { alunos, alunosInfo, page } = this.state;
        const { alunosInfo, page } = this.state;

        return (
            <div className="content">
                <h1>Alunos</h1>
                { this.state.alunos.map(aluno => (
                    <article key={aluno._id}>
                        <strong>Nome do aluno: {aluno.nome_aluno}</strong>
                        <p>Data da matrícula: {this.formatDate(aluno.data_matricula)}</p>
                        <div className="options-classes">
                            <Link className="turma-detail" to={`/Aluno/${aluno._id}`}>
                                <i className="fas fa-eye"></i>
                            </Link>                         
                        </div>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === alunosInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>                

            </div>
        );

    }

}