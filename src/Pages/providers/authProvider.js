import React, { useEffect, useState } from "react";
import jwt from 'jsonwebtoken'
import { errorToast } from "./toast/toastProvider";
export const AuthContext = React.createContext({})

export const AuthProvider = (props) => {
    const [user, setUser] = useState({ user: {} })
    const [authenticated, setAuthenticated] = useState(false)
    const [test, setTest] = useState('false')
    const secret = '!#FSDFgQ@#R@323423ok4123!#Ad!#F';

    useEffect(() => {
        const userStorage = localStorage.getItem('user')
        if (userStorage)
            setUser(JSON.parse(userStorage))
        else
            setUser({ user: {} })
    }, [])

    const setUserInLocalStorage = function (user) {
        localStorage.setItem('user', JSON.stringify(user))
    }

    const checkAuthentication = async function () {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const token = user.token
            const validToken = await jwt.verify(token, secret)
            return true
        } catch (error) {
            errorToast('Faça login novamente por favor')
            return false
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            authenticated,
            setAuthenticated,
            setUserInLocalStorage,
            checkAuthentication,
            test,
            setTest
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext)