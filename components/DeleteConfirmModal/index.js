import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "../../public/icons/close-icon.svg";
import WarningIcon from "../../public/icons/warning-icon.svg";
import Modal from "../Modal";

const DeleteConfirmModal = ({
  onConfirm = () => {},
  onClose = () => {},
  show,
  title,
}) => {
  return (
    <Modal show={show} onOverlayClick={onClose}>
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 overflow-x-hidden overflow-y-auto">
        <div className="relative h-full w-[280px] sm:w-full md:max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <CloseIcon className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <WarningIcon className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" />
              <h3 className="mb-5 text-xs lg:text-lg font-normal text-gray-500 dark:text-gray-400">
                {title}
              </h3>
              <button
                onClick={onConfirm}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs sm:text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={onClose}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-xs sm:text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

DeleteConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  show: PropTypes.bool,
};

export default DeleteConfirmModal;
