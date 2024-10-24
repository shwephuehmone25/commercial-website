import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    try {
      const storedToken = localStorage.getItem("token");
      return storedToken ? JSON.parse(storedToken) : null;
    } catch (error) {
      console.error("Error parsing token from localStorage:", error);
      return null;
    }
  });

  const updateToken = (JWTToken) => {
    if (JWTToken) {
      localStorage.setItem("token", JSON.stringify(JWTToken));
    } else {
      localStorage.removeItem("token"); 
    }
    setToken(JWTToken);
  };

  return (
    <UserContext.Provider value={{ token, updateToken }}>
      {children}
    </UserContext.Provider>
  );
};
