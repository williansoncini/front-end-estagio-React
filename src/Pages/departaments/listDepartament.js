import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import DeleteIcon from "../components/button/deleteIcon/deleteIcon"
import EditIcon from "../components/button/editIcon/editIcon"
import Title from "../components/title/title"
import { getDepartaments_new } from "../services/departaments/departamentsService"

export default function ListDepartaments() {
    const [datas, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(async function () {
        const response = await getDepartaments_new()
        if (response.status == 200) {
            setData(response.data)
            setLoading(false)
        }
    }, [])

    return (
        <>
            <div className='content-container'>
                {loading ?
                    <span>Carregando...</span> :
                    <>
                        <div className='header'>
                            <Title text='Lista de departamentos' />
                            <Link to="/departaments/create">
                                <button className='button add-button'>
                                    <span>Adicionar</span>
                                    <Icon icon="carbon:add-alt" color="#177359" width="36" height="34" />
                                </button>
                            </Link>
                        </div>
                        <table className='styled-table'>
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>DESCRICAO</td>
                                    <td>STATUS</td>
                                    <td>ACTION</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datas.map((data) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{data.id}</td>
                                                    <td>{data.descricao}</td>
                                                    <td>{data.ativo_descricao}</td>
                                                    <td>
                                                        <EditIcon path={`/departaments/update/${data.id}`} />
                                                        <DeleteIcon path={`/departaments/delete/${data.id}`} />
                                                    </td>
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