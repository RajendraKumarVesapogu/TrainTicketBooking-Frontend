import { createContext, useState, useEffect } from "react";

export const MainContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const MainContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [trains, setTrains] = useState([]);

  const getTrains = async () => {
    return trains;
  }

  const putTrains = async (data) => {
    localStorage.setItem("trains", JSON.stringify(data));
    setTrains(data);
  }



  const login = (userData) => {
    setIsLogin(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLogin(false);
    setUser(null);
    setBookedTickets([]);
    localStorage.removeItem("user");
    localStorage.removeItem("bookedTickets");
  };

  const addBookedTicket = (ticket) => {
    setBookedTickets((prevTickets) => {
      const updatedTickets = [...prevTickets, ticket];
      localStorage.setItem("bookedTickets", JSON.stringify(updatedTickets));
      return updatedTickets;
    });
  };

  const removeBookedTicket = (ticketId) => {
    setBookedTickets((prevTickets) => {
      const updatedTickets = prevTickets.filter(ticket => ticket.id !== ticketId);
      localStorage.setItem("bookedTickets", JSON.stringify(updatedTickets));
      return updatedTickets;
    });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedTickets = localStorage.getItem("bookedTickets");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLogin(true);
    }

    if (storedTickets) {
      setBookedTickets(JSON.parse(storedTickets));
    }
  }, []);

  return (
    <MainContext.Provider value={{
      isLogin,
      setIsLogin,
      putTrains,
      getTrains,
      user,
      login,
      logout,
      bookedTickets,
      addBookedTicket,
      removeBookedTicket
    }}>
      {children}
    </MainContext.Provider>
  );
};
