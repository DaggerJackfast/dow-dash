import styles from './styles.module.scss'
import Container from "../Container";
const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header__logo}>
          <a href="#">Dow Dash</a>
        </div>
        <div className={styles.header__actions}>

        </div>
      </Container>
    </header>
  )
}
export default Header;
