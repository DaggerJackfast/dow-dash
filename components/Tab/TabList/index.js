import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { childrenProps } from "../../../lib/prop-types";

export const TabList = ({ children, className }) => {
  return (
    <ul
      className={cx(
        "flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400",
        { [className]: !!className }
      )}
    >
      {children}
    </ul>
  );
};
TabList.propTypes = {
  children: childrenProps,
  className: PropTypes.string,
};