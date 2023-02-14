import { useCallback, useEffect, useRef, useState } from "react";
import useResizeDetector from "./use-resize-detector";

const useOverflowDetector = (onChange = null) => {
  const [overflow, setOverflow] = useState(false);
  const ref = useRef();

  const updateState = useCallback(() => {
    if (ref.current === undefined) {
      return;
    }
    const newState =
      ref.current.offsetWidth < ref.current.scrollWidth ||
      ref.current.offsetHeight < ref.current.scrollHeight;

    if (newState === overflow) {
      return;
    }
    setOverflow(newState);
    if (onChange) {
      onChange(newState);
    }
  }, [ref.current, onChange, setOverflow, overflow]);

  useResizeDetector({
    targetRef: ref,
    onResize: () => {
      updateState();
    },
  });
  useEffect(() => {
    updateState();
  }, []);

  return {
    overflow,
    ref,
  };
};

export default useOverflowDetector;
