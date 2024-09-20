import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../../contexts/AuthContext";
import { childrenProps } from "../../../lib/prop-types";
import LoadingScreen from "../../LoadingScreen";

const Protected = ({ children, isProtected = false }) => {
  const { isAuthenticated, isLoading } = useAuth();
  console.log("isProtected: ", isProtected);

  const showLoading = isLoading || (!isAuthenticated && isProtected);
  console.log("isLoading: ", isLoading);
  console.log("showLoading: ", showLoading);
  console.log("isAuthenticated: ", isAuthenticated);

  if (showLoading) {
    return <LoadingScreen />;
  }

  return children;
};

Protected.propTypes = {
  children: childrenProps.isRequired,
  isProtected: PropTypes.bool,
};

export default Protected;
