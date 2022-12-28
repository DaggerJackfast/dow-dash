import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { childrenProps } from "../../lib/prop-types";
const Container = ({ children, className }) => (
  <div className={cx("container mx-auto", { [className]: !!className })}>
    {children}
  </div>
);
Container.propTypes = {
  children: childrenProps.isRequired,
  className: PropTypes.string,
};
Container.defaultProps = {
  className: "",
};
export default Container;
