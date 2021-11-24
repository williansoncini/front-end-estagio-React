import { useEffect, useState } from "react"
import ExportButton from "../components/button/exportButton/exportButton"
import { getUsers } from "../services/users/usersService"
import { CSVLink } from 'react-csv'
import './report.css'

export default function ReportAcess() {
    const [users, setUsers] = useState([])
    const [usersBackup, setUsersBackup] = useState([])
    const [loading, setLoading] = useState(true)
    const [csvReport, setCsvReport] = useState([])
    const [loadingRows, setLoadingRows] = useState(false)

    useEffect(async function () {
        try {
            const response = await getUsers()
            setUsers(response)
            setUsersBackup(response)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }, [])


    function exportReport() {
        let headers = [{
            label: "Nome", key: 'nome',
            label: "Email", key: 'email',
            label: "Tipo_de_acesso", key: 'tipo_acesso'
        }]
        let data = users.map((user) => {
            return {
                nome: user.nome,
                email: user.email,
                tipo_acesso: user.tipo_acesso_descricao
            }
        })
        setCsvReport(data)
    }

    async function filterResults() {
        const name = document.getElementById('searchName').value
        const email = document.getElementById('searchEmail').value
        const type = document.getElementById('searchType').value

        let filtredRows = usersBackup
        if (name !== '') {
            filtredRows = filtredRows.filter((user, i) => user.nome.includes(name))
        }

        if (email !== '') {
            filtredRows = filtredRows.filter((user, i) => user.email.includes(email))
        }

        if (type !== '') {
            filtredRows = filtredRows.filter((user, i) => user.tipo_acesso_descricao.includes(type))
        }


        const nullValue = [
            {
                nome: '',
                email: '',
                tipo_acesso_descricao: ''
            }
        ]
        if (filtredRows[0]) {
            setUsers(nullValue)
            setLoadingRows(true)
            let promise = await new Promise(function (resolve, reject) {
                setTimeout(() => resolve("done"), 200);
            });
            setUsers(filtredRows)
            setLoadingRows(false)
        }
        else {
            setLoadingRows(true)
            let promise = await new Promise(function (resolve, reject) {
                setTimeout(() => resolve("done"), 200);
            });
            setUsers(nullValue)
            setLoadingRows(false)
        }
    }

    return (
        <>
            <div className='content-container'>
                {loading ?
                    <span>Carregando...</span> :
                    <>
                        <div className='right-side-itens'>
                            <CSVLink data={csvReport} filename='teste.csv' separator={";"} >
                                <ExportButton script={exportReport} />
                            </CSVLink>
                        </div>


                        <table className='styled-table'>
                            <thead>
                                <tr>
                                    <td>NOME <input type="search" id='searchName' onChange={() => filterResults()} /></td>
                                    <td>EMAIL <input type="search" id='searchEmail' onChange={() => filterResults()} /> </td>
                                    <td>TIPO DE ACESSO <input type="search" id='searchType' onChange={() => filterResults()} /> </td>
                                </tr>
                            </thead>
                            <tbody>
                                {loadingRows ?
                                    <span>Carregando...</span> :
                                    users.map((user) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{user.nome}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.tipo_acesso_descricao}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </>
                }
            </div>
        </>
    )
}