import styles from "./styles.module.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div>
        Dow Dash {year}
      </div>
    </footer>
  )
}
export default Footer;
