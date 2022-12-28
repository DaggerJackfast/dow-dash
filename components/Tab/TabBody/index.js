import React from "react";
import PropTypes from "prop-types";
import { childrenProps } from "../../../lib/prop-types";

export const TabBody = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};
TabBody.propTypes = {
  children: childrenProps.isRequired,
  className: PropTypes.string,
};
TabBody.defaultProps = {
  className: "",
};
