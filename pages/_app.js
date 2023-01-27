import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "../styles/globals.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";
import Favicon from "../components/Favicon";
import { AuthProvider, Protected } from "../contexts/AuthContext";
import { WebsocketProvider } from "../contexts/WebsocketContext";

const excludedPages = ["/login"];
const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <Favicon />
    </Head>
    <AuthProvider apiUrl={pageProps.apiUrl} tokenKey={pageProps.tokenKey}>
      <Protected exclude={excludedPages}>
        <WebsocketProvider
          socketUrl={pageProps.socketUrl}
          tokenKey={pageProps.tokenKey}
        >
          <Component {...pageProps} />
        </WebsocketProvider>
      </Protected>
    </AuthProvider>
    <ToastContainer />
  </>
);
MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.shape({
    apiUrl: PropTypes.string,
    socketUrl: PropTypes.string,
    tokenKey: PropTypes.string,
  }),
};
MyApp.defaultProps = {
  pageProps: {},
};
export default MyApp;
