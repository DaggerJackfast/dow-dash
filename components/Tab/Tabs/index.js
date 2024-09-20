import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { childrenProps } from "../../../lib/prop-types";

export const Tabs = ({ children, className }) => {
  return (
    <div
      className={cx("border-b border-gray-200 dark:border-gray-700", {
        [className]: !!className,
      })}
    >
      {children}
    </div>
  );
};
Tabs.propTypes = {
  children: childrenProps.isRequired,
  className: PropTypes.string,
};