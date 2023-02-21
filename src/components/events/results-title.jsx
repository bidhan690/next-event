import classes from './results-title.module.css';
import Button from '../ui/Button';

function ResultsTitle(props) {
  const {date} = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <Button href="/event">Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
