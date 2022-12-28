import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { childrenProps } from "../../../lib/prop-types";

export const Tab = ({ children, className, id, onClick, active }) => {
  return (
    <li
      role="presentation"
      id={`tab-${id}`}
      className={cx("mr-2", { [className]: !!className })}
      onClick={onClick}
    >
      <a
        href="#"
        className={cx(
          "inline-flex content-center items-center p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group",
          {
            ["border-gray-600 active"]: active,
          }
        )}
      >
        {children}
      </a>
    </li>
  );
};
Tab.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  children: childrenProps.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool,
};
Tab.defaultProps = {
  onClick: () => {},
  className: "",
  id: null,
  active: false,
};
