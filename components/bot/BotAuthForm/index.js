import React from "react";
import PropTypes from "prop-types";

const BotAuthForm = ({ username, password, onSetPassword }) => {
  const onChangePassword = (e) => {
    const { value } = e.target;
    onSetPassword(value);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center align-center content-center">
      <div className="p-4">
        <div className="text-center text-telegram-black text-xl mb-2">
          <span>Sign in</span>
        </div>
        <div className="mb-6">
          <span className="block text-telegram-black text-sm mb-2">
            Username
          </span>
          <span className="block text-telegram-black bg-telegram-secondary-white border border-gray-700 rounded py-2 px-3">
            @{username}
          </span>
        </div>
        <div className="mb-6">
          <label
            className="block text-telegram-black text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            onChange={onChangePassword}
            className="shadow appearance-none border bg-telegram-white text-telegram-black border-gray-700 rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Type password..."
            value={password}
          />
        </div>
      </div>
    </div>
  );
};

BotAuthForm.propTypes = {
  onSetPassword: PropTypes.func.isRequired,
  password: PropTypes.string,
  username: PropTypes.string,
};
BotAuthForm.defaultProps = {
  password: "",
  username: "",
};

export default BotAuthForm;
