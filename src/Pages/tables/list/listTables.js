import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../../components/button/deleteIcon/deleteIcon";
import EditIcon from "../../components/button/editIcon/editIcon";
import Title from "../../components/title/title";
import { errorToast } from "../../providers/toast/toastProvider";
import { getTables } from "../../services/table/tableService";

export default class ListTables extends React.Component {
    state = {
        loading: true,
        tables: null
    }

    async componentDidMount() {
        try {
            const tables = await getTables()
            this.setState({
                loading: false,
                tables: tables.data
            })
        } catch (error) {
            errorToast('Falha ao conectar na API!')
        }
    }

    render() {
        return (
            <>
                <div className='content-container'>
                    <div className='header'>
                        <Title text='Lista de tabelas' />
                        <div className='buttons-container'>
                            <button className='button filter-button'>
                                <span>Filtro</span>
                                <Icon icon="ant-design:filter-filled" color="black" width="36" height="34" />
                            </button>
                            <Link to="/tables/create">
                                <button className='button add-button'>
                                    <span>Adicionar</span>
                                    <Icon icon="carbon:add-alt" color="#177359" width="36" height="34" />
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='body-container'>
                        <div>
                            {this.state.loading ? (
                                <div> Carregando... </div>) : (
                                <div className='full-size-table'>
                                    <table className='styled-table'>
                                        <thead>
                                            <tr>    
                                                <th>#</th>
                                                {/* <th>Login</th> */}
                                                <th>Nome</th>
                                                <th>Categoria</th>
                                                <th>Status</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.tables.map((table) => {
                                                return (
                                                    <tr>
                                                        <td> {table.id} </td>
                                                        <td> {table.nome} </td>
                                                        <td> {table.categoria_descricao} </td>
                                                        <td> {table.ativo_descricao} </td>
                                                        <td>
                                                            <EditIcon path={`tables/update/${table.id}`} />
                                                            <DeleteIcon path={`tables/delete/${table.id}`} />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
