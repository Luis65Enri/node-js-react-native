import React, { createContext, useState } from "react";

const UserContext = createContext({
 isLoggedIn: false,
 userRole: null,
 userData: { nombre: "", apellido: "", correoElectronico: "", imagen: "" },
 setIsLoggedIn: () => {},
 setUserRole: () => {},
 setUserData: () => {},
});

export const UserProvider = ({ children }) => {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [userRole, setUserRole] = useState(null);
 const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    correoElectronico: "",
    imagen: "",
 });

 return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        userRole,
        userData,
        setIsLoggedIn,
        setUserRole,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
 );
};

export default UserContext;
