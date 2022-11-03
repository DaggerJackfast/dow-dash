import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import LoadingScreen from "../components/LoadingScreen";
import Cookies from 'js-cookie';
import axios from 'axios';
import {toast} from "react-toastify";
import _ from 'lodash';
export const AuthContext = createContext(null);

const TOKEN_COOKIE_KEY = 'token';

export const AuthProvider = ({children}) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const api = process.env.NEXT_PUBLIC_API_PATH;
  useEffect(() => {
    const loadUserFromCookies = async () => {
      const token = Cookies.get(TOKEN_COOKIE_KEY);
      if (token) {
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
          const response = await axios.get(`${api}/auth/me`, { headers });
          const { data } = await response;
          if (data) {
            setUser(data);
          }
        } catch (e) {
          const { status } = _.get(e, 'response', {})
          if(status === 401) {
              await router.push('/login')
            }
          }
        }
      else {
        setIsLoading(false);
        await router.push('/login');
      }
    }
    loadUserFromCookies().then();
  }, [api]);

  const login = async ({username, password}) => {
    try {
      const response = await axios.post(`${api}/auth/login`, {username, password} ,{
        headers: {
          'Content-Type': 'application/json',
        }
      })
        const {user, token} = response.data;
        if (token) {
          const {accessToken, expiresIn} = token;
          const seconds = parseInt(expiresIn, 10);
          const expiresDays = seconds / 60 / 60 / 24
          Cookies.set(TOKEN_COOKIE_KEY, accessToken, {expires: expiresDays});
          setUser(user);
          await router.push('/');
      }
    } catch(e) {
      const {data, status} = _.get(e, 'response', {})
      if(status === 401 && data) {
        if(data?.message) {
          const {message} = data;
          toast.error(message, {
            position: 'bottom-right',
            hideProgressBar: false,
            autoClose: 3000,
          });
        }
      }
    }
  }

  const logout = () => {
    Cookies.remove(TOKEN_COOKIE_KEY);
    setUser(null);
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!user,
      user,
      login,
      logout,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

export const Protected = ({ exclude, children}) => {
  const {isAuthenticated, isLoading} = useAuth();
  const router = useRouter();
  if(isLoading || (!isAuthenticated && !exclude.includes(router.pathname))) {
    return <LoadingScreen />
  }
  return children;
}

Protected.defaultProps = {
  exclude: [],
}
