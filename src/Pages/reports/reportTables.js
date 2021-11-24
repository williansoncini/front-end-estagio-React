import { useEffect, useState } from "react"
import ExportButton from "../components/button/exportButton/exportButton"
import { CSVLink } from 'react-csv'
import './report.css'
import { getLogTables } from "../services/table/tableService"

export default function ReportTables() {
    const [logs, setLogs] = useState([])
    const [logsBackup, setLogsBackup] = useState([])
    const [loading, setLoading] = useState(true)
    const [csvReport, setCsvReport] = useState([])
    const [loadingRows, setLoadingRows] = useState(false)

    useEffect(async function () {
        try {
            const response = await getLogTables()
            setLogs(response.data)
            setLogsBackup(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    },[])

    async function filterResults() {
        const id = document.getElementById('searchId').value
        const operacao = document.getElementById('searchOperacao').value
        const tabela = document.getElementById('searchTabela').value
        const usuario = document.getElementById('searchUsuario').value
        const data_hora = document.getElementById('searchData_hora').value

        let filtredRows = logsBackup
        if (id !== '') {
            filtredRows = filtredRows.filter((log, i) => String(log.id).includes(id))
        }
        if (operacao !== '') {
            filtredRows = filtredRows.filter((log, i) => log.operacao.includes(operacao))
        }
        if (tabela !== '') {
            filtredRows = filtredRows.filter((log, i) => log.tabela.includes(tabela))
        }
        if (usuario !== '') {
            filtredRows = filtredRows.filter((log, i) => log.usuario.includes(usuario))
        }
        if (data_hora !== '') {
            filtredRows = filtredRows.filter((log, i) => log.data_hora.includes(data_hora))
        }

        const nullValue = [
            {
                id: '',
                operacao: '',
                tabela: '',
                usuario: '',
                data_hora: ''
            }
        ]

        if (filtredRows[0]) {
            setLogs(nullValue)
            setLoadingRows(true)
            let promise = await new Promise(function (resolve, reject) {
                setTimeout(() => resolve("done"), 200);
            });
            console.log(filtredRows)
            setLogs(filtredRows)
            setLoadingRows(false)
        }
        else {
            setLoadingRows(true)
            let promise = await new Promise(function (resolve, reject) {
                setTimeout(() => resolve("done"), 200);
            });
            setLogs(nullValue)
            setLoadingRows(false)
        }
    }

    function exportReport() {
        let data = logs.map((log) => {
            return {
                id: log.id,
                operacao: log.operacao,
                tabela: log.tabela,
                usuario: log.usuario,
                data_hora: log.data_hora
            }
        })
        setCsvReport(data)
        console.log(data)
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
                                    <td>id <input type="number" id='searchId' onChange={() => filterResults()} /> </td>
                                    <td>operacao <input type="search" id='searchOperacao' onChange={() => filterResults()} /> </td>
                                    <td>tabela <input type="search" id='searchTabela' onChange={() => filterResults()} /> </td>
                                    <td>usuario <input type="search" id='searchUsuario' onChange={() => filterResults()} /> </td>
                                    <td>data_hora <input type="search" id='searchData_hora' onChange={() => filterResults()} /> </td>
                                </tr>
                            </thead>
                            <tbody>
                                {loadingRows ?
                                    <span>Carregando...</span> :
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