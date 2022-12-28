import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { childrenProps } from "../../../lib/prop-types";

export const TabPanel = ({ children, className, id, show }) => {
  return (
    <div
      id={`tab-panel-${id}`}
      className={cx(className, { ["hidden"]: !show })}
    >
      {children}
    </div>
  );
};
TabPanel.propTypes = {
  show: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
  children: childrenProps.isRequired,
};
TabPanel.defaultProps = {
  show: false,
  className: "",
};
