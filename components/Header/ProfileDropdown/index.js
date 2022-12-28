import React, { useState } from "react";
import cx from "classnames";
import PropTypes from "prop-types";

const ProfileDropdown = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const onLogout = async (e) => {
    e.preventDefault();
    await logout();
    setIsOpen(false);
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggle}
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-none px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {user.username}
        </button>
        <div
          className={cx(
            "absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            { ["hidden"]: !isOpen }
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <button
              type="button"
              onClick={onLogout}
              className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-slate-200"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
ProfileDropdown.propTypes = {
  user: PropTypes.shape({ username: PropTypes.string }),
  logout: PropTypes.func.isRequired,
};
ProfileDropdown.defaultProps = {
  user: null,
};
export default ProfileDropdown;
