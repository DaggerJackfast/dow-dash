import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import useOverflowDetector from "../../hooks/use-overflow-detector";
import { humanFileSize } from "../../lib/utils";
const File = ({
  name,
  path,
  mimeType,
  size,
  isDirectory,
  selected,
  onClick,
}) => {
  const { ref, overflow } = useOverflowDetector();
  return (
    <>
      <div
        className={cx(
          "border color rounded-lg m-1 p-4 w-full lg:w-1/2 xl:w-1/4 cursor-pointer",
          {
            ["bg-green-100"]: selected,
            ["bg-gray-200"]: isDirectory,
          }
        )}
        role="presentation"
        onClick={() => onClick()}
      >
        <div className="test-sm xl:text-xl pb-4 overflow-hidden" ref={ref}>
          <span
            className={cx("block font-light text-ellipsis", {
              ["animate-marquee"]: overflow,
            })}
          >
            {name}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold font-light">
              type
            </span>
            <span className="font-mono">{mimeType}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold font-light">
              size
            </span>
            <span className="font-mono">{humanFileSize(size, true)}</span>
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
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  isDirectory: PropTypes.bool,
};
File.defaultProps = {
  name: "",
  path: "",
  mimeType: "",
  size: 0,
  isDirectory: false,
  selected: false,
  onClick: () => {},
};
export default File;
