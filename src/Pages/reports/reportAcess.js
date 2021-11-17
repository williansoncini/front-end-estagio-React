import { useEffect, useState } from "react"
import ExportButton from "../components/button/exportButton/exportButton"
import { getUsers } from "../services/users/usersService"
import { CSVLink } from 'react-csv'
import './report.css'

export default function ReportAcess() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [csvReport, setCsvReport] = useState([])

    useEffect(async function () {
        try {
            const response = await getUsers()
            setUsers(response)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    })

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
        console.log(data)

        // setCsvReport({
        //     headers: headers,
        //     data: data,
        //     filename:"Tipo_de_acesso_por_usuario.csv"
        // })
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
                                    <td>NOME</td>
                                    <td>EMAIL</td>
                                    <td>TIPO DE ACESSO</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
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