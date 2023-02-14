import { useLayoutEffect, useEffect, useState, useRef } from "react";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";

export const patchResizeHandler = (
  resizeCallback,
  refreshMode,
  refreshRate,
  refreshOptions
) => {
  switch (refreshMode) {
    case "debounce":
      return debounce(resizeCallback, refreshRate, refreshOptions);
    case "throttle":
      return throttle(resizeCallback, refreshRate, refreshOptions);
    default:
      return resizeCallback;
  }
};

export const isFunction = (fn) => typeof fn === "function";

export const isSSR = () => typeof window === "undefined";

export const isDOMElement = (element) =>
  element instanceof Element || element instanceof HTMLDocument;

export const createNotifier =
  (onResize, setSize, handleWidth, handleHeight) =>
  ({ width, height }) => {
    setSize((prev) => {
      if (prev.width === width && prev.height === height) {
        // skip if dimensions haven't changed
        return prev;
      }

      if (
        (prev.width === width && !handleHeight) ||
        (prev.height === height && !handleWidth)
      ) {
        // process `handleHeight/handleWidth` props
        return prev;
      }

      onResize && onResize(width, height);

      return { width, height };
    });
  };

const useEnhancedEffect = isSSR() ? useEffect : useLayoutEffect;

function useResizeDetector(props = {}) {
  const {
    skipOnMount = false,
    refreshMode,
    refreshRate = 1000,
    refreshOptions,
    handleWidth = true,
    handleHeight = true,
    targetRef,
    observerOptions,
    onResize,
  } = props;

  const skipResize = useRef(skipOnMount);
  const localRef = useRef(null);
  const resizeHandler = useRef();

  const ref = targetRef ?? localRef;

  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEnhancedEffect(() => {
    if (!handleWidth && !handleHeight) return;

    const notifyResize = createNotifier(
      onResize,
      setSize,
      handleWidth,
      handleHeight
    );

    const resizeCallback = (entries) => {
      if (!handleWidth && !handleHeight) return;

      entries.forEach((entry) => {
        const { width, height } = (entry && entry.contentRect) || {};

        const shouldSetSize = !skipResize.current;
        if (shouldSetSize) {
          notifyResize({ width, height });
        }

        skipResize.current = false;
      });
    };

    resizeHandler.current = patchResizeHandler(
      resizeCallback,
      refreshMode,
      refreshRate,
      refreshOptions
    );

    const resizeObserver = new window.ResizeObserver(resizeHandler.current);

    if (ref.current) {
      resizeObserver.observe(ref.current, observerOptions);
    }

    return () => {
      resizeObserver.disconnect();
      resizeHandler.current.cancel && resizeHandler.current.cancel();
    };
  }, [
    refreshMode,
    refreshRate,
    refreshOptions,
    handleWidth,
    handleHeight,
    onResize,
    observerOptions,
    ref.current,
  ]);

  return { ref, ...size };
}

export default useResizeDetector;
