import {getFilteredEvents} from '../../helpers/api-util';
import {Fragment} from 'react';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/Button';
import Head from 'next/head';

export default function EventSlug(props) {
  const filterdEvent = props.filterdEvent;

  if (!filterdEvent || filterdEvent.length === 0) {
    return (
      <Fragment className="center">
        <p className="center">No filter at selected dates!</p>
        <Button className="center" href="/event">
          All Events
        </Button>
      </Fragment>
    );
  }

  const date = new Date(props.numYear, props.numMonth - 1);
  return (
    <Fragment>
      <Head>
        <title>Filtered Events For {props.numMonth + '/' + props.numYear}</title>
        <meta name="description" content="Filtered Events " />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filterdEvent}></EventList>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const {params} = context;
  const path = params.slug;

  const year = path[0];
  const month = path[1];
  const numYear = +year;
  const numMonth = +month;

  if (isNaN(numYear) || isNaN(numMonth)) {
    return {
      notFound: true,
    };
  }
  const filterdEvent = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  return {
    props: {
      filterdEvent: filterdEvent,
      numYear: numYear,
      numMonth: numMonth,
    },
  };
}
