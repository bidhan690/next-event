import EventItem from './EventItem';
import styles from './EventList.module.css';
export default function EventList(props) {
  const {items} = props;

  return (
    <ul className={styles.list}>
      {items.map((event) => {
        return <EventItem key={event.id} {...event} />;
      })}
    </ul>
  );
}
