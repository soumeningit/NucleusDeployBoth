import { createContext, useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [data, setData] = useState({
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  });

  const tokenExpiryTimeout = useRef(null);

  const addData = (token, user) => {
    setData({ token, user });
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeData = () => {
    setData({ token: null, user: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (tokenExpiryTimeout.current) {
      clearTimeout(tokenExpiryTimeout.current);
      tokenExpiryTimeout.current = null;
    }
  };

  async function handleLogout() {
    try {
      const response = await logoutUserAPI();
      if (response.status === 200) {
        removeData();
        return true;
      }
    } catch (error) {
      console.error("Error logging out:", error);
      removeData(); // fallback
      return true;
    } finally {
      if (tokenExpiryTimeout.current) {
        clearTimeout(tokenExpiryTimeout.current);
        tokenExpiryTimeout.current = null;
      }
    }
  }

  async function handleRemove() {
    try {
      const response = await refreshTokenAPI();
      console.log("Refresh token response:", response);
      if (response.status === 200 && response.data.data.token) {
        const newToken = response.data.data.token;
        const newUser = {
          name: response.data.data.name,
          email: response.data.data.email,
          userId: response.data.data.id,
          role: response.data.data.role,
        };
        addData(newToken, newUser);
        return true;
      }
      removeData();
      return true;
    } catch (error) {
      handleLogout();
      console.error("Error in refreshing token:", error);
      removeData(); // fallback
      return true;
    }
  }

  function logOutContext() {
    console.log("Logging out user...");
    return handleLogout();
  }

  function scheduleTokenExpiry(jwtToken) {
    try {
      const decoded = jwtDecode(jwtToken);
      const expiryTime = decoded.exp * 1000;
      const timeLeft = expiryTime - Date.now();

      if (timeLeft <= 0) {
        handleRemove();
        return;
      }

      if (tokenExpiryTimeout.current) {
        clearTimeout(tokenExpiryTimeout.current);
      }

      tokenExpiryTimeout.current = setTimeout(() => {
        handleRemove();
      }, timeLeft);
    } catch (error) {
      console.error("Error scheduling token expiry:", error);
      handleRemove();
    }
  }

  useEffect(() => {
    if (data.token) {
      scheduleTokenExpiry(data.token);
    }
  }, [data.token]);

  return (
    <AuthContext.Provider value={{ data, addData, logOutContext }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
