import { createContext, useEffect, useState } from "react"

// eslint-disable-next-line react-refresh/only-export-components
export const tokenAuthContext = createContext()

// eslint-disable-next-line react/prop-types
function AuthContext({children}) {
    const [isAuthorised, setIsAuthorised] = useState(false)
    
    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAuthorised(true)
        }else{
            setIsAuthorised(false)
        }
    },[isAuthorised])
  return (
    <>
        <tokenAuthContext.Provider value={{isAuthorised, setIsAuthorised}}>{children}</tokenAuthContext.Provider>
    </>
  )
}

export default AuthContext