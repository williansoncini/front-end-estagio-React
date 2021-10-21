import React, {useEffect, useState} from "react";

export const AuthContext = React.createContext({})

export const AuthProvider = (props) => {
    const [email, setEmail] = useState({
        name:''
    })

    useEffect(() => {
        const emailStorage = localStorage.getItem('email')
        console.log(emailStorage)
        if (emailStorage)
            setEmail(JSON.parse(emailStorage))
        else
            setEmail({
                name: ''
            })
    }, [])

    return (
        <AuthContext.Provider value={{email, setEmail}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext)