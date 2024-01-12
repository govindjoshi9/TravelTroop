import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});


export function UserContextProvider({ children }) {

  const [user, setuser] = useState(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        
        setuser(data);
        setReady(true);
      });
    }
  },[])
  return (
    <UserContext.Provider value={{ user, setuser, ready }}>
    {children}
  </UserContext.Provider>
  );
}
