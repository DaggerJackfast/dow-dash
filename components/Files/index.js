import React, { useMemo, useRef, useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import DeleteConfirmModal from "../DeleteConfirmModal";
import File from "../File";

const Files = ({ files, onDelete }) => {
  const [selected, setSelected] = useState({});
  const [checked, setChecked] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const checkboxRef = useRef(null);

  const selectedLength = useMemo(
    () => Object.keys(selected).length,
    [selected]
  );

  const onFilesDelete = () => {
    if (!selectedLength) {
      return;
    }
    const deleteFiles = _.keys(selected);
    onDelete(deleteFiles);
    setSelected(false);
  };

  const onDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  React.useEffect(() => {
    if (checkboxRef?.current) {
      if (!selectedLength) {
        checkboxRef.current.indeterminate = false;
        setChecked(false);
        return;
      }
      if (selectedLength === files.length) {
        checkboxRef.current.indeterminate = false;
        setChecked(true);
        return;
      }
      if (selectedLength < files.length) {
        checkboxRef.current.indeterminate = true;
        setChecked(false);
      }
    }
  }, [checkboxRef?.current, selectedLength]);

  const isSelected = (file) => {
    const { name } = file;
    return _.has(selected, name);
  };

  const toggleSelected = (file) => {
    const { name } = file;
    const newSelected = isSelected(file)
      ? _.omit(selected, name)
      : { ...selected, [name]: file };
    setSelected(newSelected);
  };

  const onSelect = () => {
    let newSelected = {};
    const length = Object.keys(selected).length;
    if (length === files.length) {
      newSelected = {};
    }
    if (length < files.length) {
      newSelected = _.reduce(
        files,
        (acc, file) => ({ ...acc, [file.name]: file }),
        {}
      );
    }
    setSelected(newSelected);
  };

  const onClose = () => setShowDeleteConfirm(false);

  return (
    <>
      <div className="w-10/12 lg:w-2/3 mx-auto">
        {files?.length > 0 && (
          <div className="flex content-center items-center border border-gray-200 p-4 rounded-lg m-1 mb-4">
            <div className="mr-5">
              <input
                onChange={onSelect}
                ref={checkboxRef}
                type="checkbox"
                checked={checked}
                className="w-5 h-5 bg-gray-100 border-gray-300 rounded focus:none dark:focus:none dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <button
              disabled={!selectedLength}
              className="btn bg-red-500 text-white px-4 py-2 rounded-lg disabled:bg-red-300"
              onClick={onDeleteClick}
            >
              <span>delete</span>
            </button>
            {selectedLength > 0 && (
              <div className="ml-5 font-light">
                <span>
                  selected: {selectedLength}{" "}
                  {selectedLength > 1 ? <>files</> : <>file</>}
                </span>
              </div>
            )}
          </div>
        )}
        <div className="flex align-center flex-row flex-wrap justify-start">
          {files.map((file) => (
            <File
              key={file.path}
              name={file.name}
              mimeType={file.mimeType}
              isDirectory={file.isDirectory}
              size={file.size}
              selected={isSelected(file)}
              onClick={() => toggleSelected(file)}
            />
          ))}
        </div>
      </div>
      <DeleteConfirmModal
        title="Are you sure you want to delete the files?"
        onConfirm={() => onFilesDelete()}
        onClose={() => onClose()}
        show={showDeleteConfirm}
      />
    </>
  );
};

Files.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      name: PropTypes.string,
      mimeType: PropTypes.string,
      size: PropTypes.number,
      isDirectory: PropTypes.bool,
    })
  ),
  onDelete: PropTypes.func,
};
Files.defaultProps = {
  files: [],
  onDelete: () => {},
};

export default Files;
