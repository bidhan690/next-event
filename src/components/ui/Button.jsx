import Link from 'next/link';
import styles from './Button.module.css';

export default function Button(props) {
  if (props.href) {
    return (
      <Link href={props.href} className={styles.btn}>
        {props.children}
      </Link>
    );
  }
  return (
    <button onClick={props.onClick} type={props.type} className={styles.btn}>
      {props.children}
    </button>
  );
}
