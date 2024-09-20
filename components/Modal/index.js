import React, { useEffect } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { childrenProps } from "../../lib/prop-types";

const Modal = ({ className, show, children, onOverlayClick }) => {
  const overlay = "fixed inset-0 z-10 overflow-y-auto bg-slate-900/[.5]";

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) {
      return;
    }
    if (show) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "unset";
    }
  }, [show]);

  const content = show ? (
    <div
      className={cx(overlay, className)}
      onClick={onOverlayClick}
      aria-hidden="true"
    >
      {children}
    </div>
  ) : null;

  return <>{createPortal(content, document.getElementById("modal-root"))}</>;
};
Modal.propTypes = {
  children: childrenProps.isRequired,
  className: PropTypes.string,
  show: PropTypes.bool,
  onOverlayClick: PropTypes.func,
};

export default Modal;
