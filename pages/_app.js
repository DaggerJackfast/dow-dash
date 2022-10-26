import React from 'react';
import '../styles/globals.scss'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';
import {socket, WebsocketProvider} from "../contexts/WebsocketContext";

function MyApp({Component, pageProps}) {
  return (
    <>
      <WebsocketProvider value={socket}>
        <Component/>
      </WebsocketProvider>
      <ToastContainer/>
    </>
  )
}

export default MyApp
