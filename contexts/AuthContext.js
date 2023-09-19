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

const setCookies = (tokenKey, token) => {
  const { accessToken, expiresIn } = token;
  const seconds = parseInt(expiresIn, 10);
  const expiresDays = seconds / 60 / 60 / 24;
  Cookies.set(tokenKey, accessToken, {
    expires: expiresDays,
    secure: true,
    sameSite: "strict",
  });
};

export const AuthProvider = ({ children, apiUrl, tokenKey, isProtected }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUserFromCookies().then();
  }, [apiUrl, tokenKey]);

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

        if (!data) return;

        setUser(data);
      } catch (e) {
        const { status } = _.get(e, "response", {});

        if (status === 401) {
          await router.push("/login");
        }
      }
      return;
    }
    setIsLoading(false);
    if (isProtected) {
      await router.push("/login");
    }
  };

  const login = async ({ username, password }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        { username, password },
        {
          headers: {
            "Access-Control-Allow-Origin": window.location.origin,
            "Content-Type": "application/json",
          },
        }
      );

      const { user, token } = response.data;

      if (!token) return;

      setCookies(tokenKey, token);
      setUser(user);

      await router.push("/");
    } catch (err) {
      const { data, status } = _.get(err, "response", {});
      if (status === 401 && data?.message) {
        const { message } = data;
        toast.error(message, {
          position: "bottom-right",
          hideProgressBar: false,
          autoClose: 3000,
        });
      }
    }
  };

  const logout = async () => {
    Cookies.remove(tokenKey);
    setUser(null);
    await router.push("/login");
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
  isProtected: PropTypes.bool,
};
AuthProvider.defaultProps = {
  apiUrl: "",
  tokenKey: "",
  isProtected: false,
};

export const useAuth = () => useContext(AuthContext);
