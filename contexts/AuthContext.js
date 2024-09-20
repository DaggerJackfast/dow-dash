import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import useSWR from "swr";
import { childrenProps } from "../lib/prop-types";

export const AuthContext = createContext(null);

const postFetcher = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetcher = async (url, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const AuthProvider = ({
  children,
  apiUrl,
  tokenKey,
  isProtected = true,
}) => {
  const router = useRouter();
  const [token, setToken] = useState(Cookies.get(tokenKey));
  const {
    data: user,
    error,
    mutate: userMutate,
  } = useSWR(`${apiUrl}/auth/me`, (url) => fetcher(url, token), {
    shouldRetryOnError: false,
  });

  console.log("TOKEN: ", token);

  React.useEffect(() => {
    if (token) {
      userMutate();
    }
  }, [token]);

  const loadUserFromCookies = async () => {
    if (token) {
      try {
        await userMutate();
      } catch (e) {
        const status = e.response?.status;
        if (status === 401) {
          console.log("PUsh to login");
          setToken(null);
          await router.push("/login");
        }
      }
    } else {
      console.log("AAAAAAAA push to login");
      await router.push("/login");
    }
  };

  const login = async ({ username, password }) => {
    try {
      const response = await postFetcher(
        `${apiUrl}/auth/login`,
        { username, password },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );

      const { user, token } = response;

      if (!token) return;

      Cookies.set(tokenKey, token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      setToken(token);
      await router.push("/");
    } catch (err) {
      const { data, status } = err.response || {};
      if (status === 401 && data?.message) {
        toast.error(data.message, {
          position: "bottom-right",
          hideProgressBar: false,
          autoClose: 3000,
        });
      }
    }
  };

  const logout = async () => {
    Cookies.remove(tokenKey);
    setToken(null);
    await router.push("/login");
  };

  React.useEffect(() => {
    loadUserFromCookies();
  }, [apiUrl, tokenKey, token]);

  console.log("error: ", error);
  console.log("user: ", user);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        isLoading: !user && !error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  children: childrenProps.isRequired,
  tokenKey: PropTypes.string.isRequired,
  isProtected: PropTypes.bool,
};

export const useAuth = () => useContext(AuthContext);
