import PropTypes from "prop-types";

export const childrenProps = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
  PropTypes.string,
  PropTypes.func,
]);

export const refProp = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({ current: PropTypes.elementType }),
  PropTypes.shape({ current: PropTypes.any }),
]);
