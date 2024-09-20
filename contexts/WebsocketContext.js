import React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import { childrenProps } from "../lib/prop-types";

export const WebsocketContext = createContext(null);

export const useSocket = () => useContext(WebsocketContext);

export const WebsocketProvider = ({ children, socketUrl, tokenKey }) => {
  const accessToken = Cookies.get(tokenKey);
  const [socket, setSocket] = useState(null);

  const connectSocket = useCallback(() => {
    const ioSocket = io(socketUrl, {
      reconnection: true,
      transports: ["websocket"],
      auth: { token: accessToken },
    });
    setSocket(ioSocket);
  }, [socketUrl, accessToken]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
    setSocket(null);
  }, [socket]);

  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [connectSocket]);

  return (
    <WebsocketContext.Provider value={socket}>
      {children}
    </WebsocketContext.Provider>
  );
};

WebsocketProvider.propTypes = {
  socketUrl: PropTypes.string,
  children: childrenProps.isRequired,
  tokenKey: PropTypes.string,
};
