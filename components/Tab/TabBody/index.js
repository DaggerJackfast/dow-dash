import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { childrenProps } from "../../../lib/prop-types";

export const TabBody = ({ children, className }) => {
  return (
    <div className={cx("pt-20 pb-20", { [className]: !!className })}>
      {children}
    </div>
  );
};
TabBody.propTypes = {
  children: childrenProps.isRequired,
  className: PropTypes.string,
};
TabBody.defaultProps = {
  className: "",
};
