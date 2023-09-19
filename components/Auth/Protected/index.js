import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../../contexts/AuthContext";
import { childrenProps } from "../../../lib/prop-types";
import LoadingScreen from "../../LoadingScreen";

const Protected = ({ children, isProtected }) => {
  const { isAuthenticated, isLoading } = useAuth();

  const showLoading = isLoading || (!isAuthenticated && isProtected);

  if (showLoading) {
    return <LoadingScreen />;
  }
  return children;
};
Protected.propTypes = {
  children: childrenProps.isRequired,
  isProtected: PropTypes.bool,
};
Protected.defaultProps = {
  isProtected: false,
};

export default Protected;
