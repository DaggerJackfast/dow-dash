import { createContext } from 'react';
import {io} from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_HOST)
export const WebsocketContext = createContext(socket);
export const WebsocketProvider = WebsocketContext.Provider;
