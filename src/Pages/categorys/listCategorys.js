import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import DeleteIcon from "../components/button/deleteIcon/deleteIcon"
import EditIcon from "../components/button/editIcon/editIcon"
import Title from "../components/title/title"
import { getCategorys } from "../services/categoria/categoryService"

export default function ListCategorys() {
    const [categorys, setCategorys] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(async function () {
        const response = await getCategorys()
        if (response.status == 200) {
            setCategorys(response.data)
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
                            <Title text='Lista de categorias' />
                            <Link to="/categorys/create">
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
                                    categorys.map((category) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{category.id}</td>
                                                    <td>{category.descricao}</td>
                                                    <td>{category.ativa_descricao}</td>
                                                    <td>
                                                        <EditIcon path={`/categorys/update/${category.id}`} />
                                                        <DeleteIcon path={`/categorys/delete/${category.id}`} />
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