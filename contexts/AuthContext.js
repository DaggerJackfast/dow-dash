import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import _ from "lodash";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";
import { childrenProps } from "../lib/prop-types";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children, apiUrl, tokenKey }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const loadUserFromCookies = async () => {
      const token = Cookies.get(tokenKey);
      if (token) {
        try {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get(`${apiUrl}/auth/me`, { headers });
          const { data } = await response;
          if (data) {
            setUser(data);
          }
        } catch (e) {
          const { status } = _.get(e, "response", {});
          if (status === 401) {
            await router.push("/login");
          }
        }
      } else {
        setIsLoading(false);
        await router.push("/login");
      }
    };
    loadUserFromCookies().then();
  }, [apiUrl]);

  const login = async ({ username, password }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { user, token } = response.data;
      if (token) {
        const { accessToken, expiresIn } = token;
        const seconds = parseInt(expiresIn, 10);
        const expiresDays = seconds / 60 / 60 / 24;
        Cookies.set(tokenKey, accessToken, { expires: expiresDays });
        setUser(user);
        await router.push("/");
      }
    } catch (e) {
      const { data, status } = _.get(e, "response", {});
      if (status === 401 && data) {
        if (data?.message) {
          const { message } = data;
          toast.error(message, {
            position: "bottom-right",
            hideProgressBar: false,
            autoClose: 3000,
          });
        }
      }
    }
  };

  const logout = () => {
    Cookies.remove(tokenKey);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  apiUrl: PropTypes.string,
  children: childrenProps.isRequired,
  tokenKey: PropTypes.string,
};
AuthProvider.defaultProps = {
  apiUrl: "",
  exclude: [],
  tokenKey: "",
};

export const useAuth = () => useContext(AuthContext);

export const Protected = ({ exclude, children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  if (isLoading || (!isAuthenticated && !exclude.includes(router.pathname))) {
    return <LoadingScreen />;
  }
  return children;
};
Protected.propTypes = {
  exclude: PropTypes.arrayOf(PropTypes.string),
  children: childrenProps.isRequired,
};
Protected.defaultProps = {
  exclude: [],
};
