import Link from 'next/link';
import styles from './MainHeader.module.css';
export default function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Bidhan</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="/event">Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
