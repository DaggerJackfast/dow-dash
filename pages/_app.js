import React from 'react';
import '../styles/globals.scss'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';
import {WebsocketProvider} from "../contexts/WebsocketContext";
import {AuthProvider, Protected} from "../contexts/AuthContext";
const excludedPages = ['/login'];
function MyApp({Component, pageProps}) {
  return (
    <>
      <AuthProvider>
        <Protected exclude={excludedPages}>
          <WebsocketProvider>
            <Component {...pageProps}/>
          </WebsocketProvider>
        </Protected>
      </AuthProvider>
      <ToastContainer/>
    </>
  )
}

export default MyApp
