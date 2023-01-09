import React from "react";
import PropTypes from "prop-types";
import { humanFileSize } from "../../lib/utils";
const File = ({ name, path, mimeType, size }) => {
  return (
    <>
      <div className="border color rounded-lg m-1 p-4 w-1/4">
        <div className="text-xl pb-4 overflow-hidden whitespace-nowrap text-ellipsis">
          <span className="font-bold font-light">{name}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold font-light">type</span>
            <span className="font-mono">{mimeType}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-light">size</span>
            <span className="font-mono">{humanFileSize(size)}</span>
          </div>
        </div>
      </div>
    </>
  );
};
File.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  mimeType: PropTypes.string,
  size: PropTypes.number,
};
File.defaultProps = {
  name: "",
  path: "",
  mimeType: "",
  size: 0,
};
export default File;
