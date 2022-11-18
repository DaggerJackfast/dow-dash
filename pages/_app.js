import React from 'react';
import '../styles/globals.scss'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';
import {WebsocketProvider} from "../contexts/WebsocketContext";
import {AuthProvider, Protected} from "../contexts/AuthContext";
import Head from "next/head";
import Favicon from "../components/Favicon";
const excludedPages = ['/login'];
function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <Favicon/>
      </Head>
      <AuthProvider apiUrl={pageProps.apiUrl} >
        <Protected exclude={excludedPages}>
          <WebsocketProvider socketUrl={pageProps.socketUrl}>
            <Component {...pageProps}/>
          </WebsocketProvider>
        </Protected>
      </AuthProvider>
      <ToastContainer/>
    </>
  )
}

export default MyApp
