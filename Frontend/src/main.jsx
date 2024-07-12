import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import axios from "axios";

export const Context = createContext({ isAuthorized: false });

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          { withCredentials: true }
        );
        setUser(data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
        setUser(null); // Clear user state on error
      }
    };

    fetchUser();
  }, []);

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
