import React, { Component } from 'react';
import api from '../../services/services';
import { Link } from 'react-router-dom';
import './turmas.css';

export default class TelaTurmas extends Component {

    state = {
        turmas: [],
        turmasInfo: [],
        page: 1,        
    };

    componentDidMount() {

        this.loadTurmas();

    }

    loadTurmas = async (page = 1) => {

        const response = await api.get(`/turmas?page=${page}`);
        const { docs, ...turmasInfo } = response.data;
        this.setState({
            turmas: docs,
            turmasInfo,
            page
        });

    }

    prevPage = () => {

        const { page } = this.state;
        if (page === 1) return;

        const pageNumber = page - 1;
        this.loadTurmas(pageNumber);

    }

    nextPage = () => {

        const { page, turmasInfo } = this.state;
        if (page === turmasInfo.page) return;

        const pageNumber = page + 1;
        this.loadTurmas(pageNumber);

    }

    render() {

        const { turmasInfo, page } = this.state;

        return (
            <div className="content">
                <h1>Turmas</h1>
                { this.state.turmas.map(turma => (
                    <article key={turma._id}>
                        <strong>{turma.nome_turma}</strong>
                        <p>{turma.curso}</p>
                        <div className="options-classes">
                            <Link className="turma-detail" to={`/Turma/${turma._id}`}>
                                <i className="fas fa-eye"></i>
                            </Link>                         
                        </div>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === turmasInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>                

            </div>
        );

    }

}