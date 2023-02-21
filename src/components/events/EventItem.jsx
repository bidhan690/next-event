import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Image from 'next/image';
import styles from './EventItem.module.css';
import Button from '../ui/Button';

export default function EventItem(props) {
  const {title, image, date, location, id} = props;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedLocation = location.replace(', ', '\n');
  return (
    <li className={styles.item}>
      <Image src={'/' + image} alt={title} height={540} width={560} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateRangeIcon />
            <date>{formattedDate}</date>
          </div>
          <div className={styles.address}>
            <LocationOnIcon />
            <address>{formattedLocation}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button href={`/event/${id}`}>
            <span>Explore More </span>
            <span className={styles.icon}>
              <ArrowRightAltIcon fontSize="large" />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
