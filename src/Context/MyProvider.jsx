import React from 'react'
import MyContext from './context'
import { useState } from 'react'

const MyProvider = ({ children }) => {

    const [password, setPassword] = useState("initial");
    const [refresh, setRefresh] = useState(false);
    const state = {
        password,
        refresh,
        setPassword,
        setRefresh
    }
    
    return (
        <MyContext.Provider value={state}>
            {children}
        </MyContext.Provider>
    )
}

export default MyProvider