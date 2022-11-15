import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import Cookies from 'js-cookie';
import getConfig from "next/config";

export const WebsocketContext = createContext(null);

export const useSocket = () => useContext(WebsocketContext);

export const WebsocketProvider = ({children}) => {
  const accessToken = Cookies.get('token');
  const [socket, setSocket] = useState(null);
  const {publicRuntimeConfig} = getConfig();
  const socketUrl = publicRuntimeConfig.websocketHost;
  const connectSocket = useCallback(() => {
    const headers = accessToken ? {
      Authorization: `Bearer ${accessToken}`
    } : {};
    const ioSocket = io(socketUrl, {
      reconnection: true,
      extraHeaders: {...headers}
    });
    setSocket(ioSocket);
  }, [socketUrl, accessToken])

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
    setSocket(null);
  }, [socket]);

  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket()
    }
  },[connectSocket])

  return (
    <WebsocketContext.Provider value={socket} >
      {children}
    </WebsocketContext.Provider>
  )
}
