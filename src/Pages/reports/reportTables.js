import { useEffect, useState } from "react"
import ExportButton from "../components/button/exportButton/exportButton"
import { CSVLink } from 'react-csv'
import './report.css'
import { getLogTables } from "../services/table/tableService"

export default function ReportTables() {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [csvReport, setCsvReport] = useState([])

    useEffect(async function () {
        try {
            const response = await getLogTables()
            setLogs(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    })

    function exportReport() {
        let data = logs.map((log) => {
            return {
                id: log.id,
                operacao: log.operacao,
                tabela: log.tabela,
                usuario: log.usuario,
                data_hora:log.data_hora
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
                                <td>id</td>
                                <td>operacao</td>
                                <td>tabela</td>
                                <td>usuario</td>
                                <td>data_hora</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    logs.map((log) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{log.id}</td>
                                                    <td>{log.operacao}</td>
                                                    <td>{log.tabela}</td>
                                                    <td>{log.usuario}</td>
                                                    <td>{log.data_hora}</td>
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