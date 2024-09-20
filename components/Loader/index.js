import React from "react";
import PropTypes from "prop-types";
const Loader = ({ text = "Loading" }) => (
  <div className="relative h-64 w-64">
    <div className="border-t-slate-700 border-solid animate-spin rounded-full border-slate-200 border-8 h-64 w-64" />
    <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 text-slate-700 animate-pulse">
      {text}
    </div>
  </div>
);
Loader.propTypes = {
  text: PropTypes.string,
};

export default Loader;
