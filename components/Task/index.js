import React, { useState } from "react";
import cx from "classnames";
import dayjs from "dayjs";
import { get } from "lodash";
import PropTypes from "prop-types";
import { CircularProgressbar } from "react-circular-progressbar";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import useOverflowDetector from "../../hooks/use-overflow-detector";
import DeleteConfirmModal from "../DeleteConfirmModal";

const stageClasses = Object.freeze({
  created: "",
  downloading: "text-sky-500 border-sky-500",
  uploading: "text-teal-700 border-teal-700",
  deleted: "text-red-600 border-red-600",
});

const Task = ({
  name,
  datetime,
  url,
  stage,
  download,
  upload,
  message,
  onDelete,
}) => {
  const onCopyToClipboard = () => {
    toast.info(`Url of task "${name}" is copied to clipboard`, {
      position: "bottom-right",
      hideProgressBar: false,
      autoClose: 3000,
    });
  };
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const onDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const onClose = () => {
    setShowDeleteConfirm(false);
  };

  const stageName = Object.keys(stageClasses)[stage];
  const stageClass = get(stageClasses, stageName);

  const { ref, overflow } = useOverflowDetector();
  return (
    <>
      <div
        className={cx("border color rounded-lg m-1 p-4", {
          [stageClass]: true,
        })}
      >
        <div className="pb-3 text-opacity-70 text-sm">
          <span>{dayjs(datetime).format("YYYY-MM-DD, HH:MM")}</span>
        </div>
        <div className="flex">
          <div className="overflow-hidden" ref={ref}>
            <h2
              className={cx("mb-4 text-sm xl:text-xl text-ellipsis", {
                ["animate-marquee"]: overflow,
              })}
            >
              {name}
            </h2>
            <span className="m-0 text-sm xl:text-xl">{stageName}</span>
          </div>
        </div>
        <div className="flex justify-between align-center content-center">
          <div className="flex ml-2 mt-4">
            <div className="w-12 mr-3 last-of-type:mr-0">
              <CircularProgressbar
                value={download}
                maxValue={1}
                text={`${(download * 100).toFixed(2)}%`}
              />
            </div>
            <div className="w-12 mr-3 last-of-type:mr-0">
              <CircularProgressbar
                className="green-progress"
                maxValue={1}
                value={upload}
                text={`${(upload * 100).toFixed(2)}%`}
              />
            </div>
            {message && (
              <div className="mr-3 last-of-type:mr-0 flex items-center">
                <span>{message}</span>
              </div>
            )}
          </div>
          <div>
            <button
              className="btn bg-red-400 rounded-lg p-2 lg:px-4 lg:py-3 text-white text-sm xl:text-lg self-end mr-2"
              type="button"
              onClick={onDeleteClick}
            >
              <span>delete</span>
            </button>
            <CopyToClipboard text={url}>
              <button
                className="btn bg-blue-500 rounded-lg p-2 lg:px-4 lg:py-3 text-white text-sm xl:text-lg self-end"
                type="button"
                onClick={onCopyToClipboard}
              >
                <span>copy url</span>
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
      <DeleteConfirmModal
        title="Are you sure you want to delete this task?"
        onConfirm={() => onDelete()}
        onClose={() => onClose()}
        show={showDeleteConfirm}
      />
    </>
  );
};

Task.propTypes = {
  name: PropTypes.string,
  datetime: PropTypes.string,
  url: PropTypes.string,
  stage: PropTypes.number,
  download: PropTypes.number,
  upload: PropTypes.number,
  onDelete: PropTypes.func,
  message: PropTypes.string,
};

Task.defaultProps = {
  name: "",
  datetime: "",
  url: "",
  stage: 0,
  download: 0,
  upload: 0,
  message: "",
  onDelete: () => {},
};

export default Task;
