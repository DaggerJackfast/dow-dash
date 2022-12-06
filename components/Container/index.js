import cx from 'classnames';
const Container = ({children, className}) => (
  <div className={cx("container mx-auto", {[className]: !!className})}>
    {children}
  </div>
)
export default Container;
