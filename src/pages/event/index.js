import {Fragment} from 'react';
import {useRouter} from 'next/router';
import {getAllData} from '../../helpers/api-util';
import EventSearch from '../../components/events/EventSearch';
import EventList from '../../components/events/EventList';

import Head from 'next/head';

export default function EventPage(props) {
  const router = useRouter();

  const events = props.events;
  function findFilteredEventHandler(year, month) {
    const fullPath = `/event/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="All Events in our page" />
      </Head>
      <EventSearch onFilter={findFilteredEventHandler} />
      <EventList items={events}></EventList>
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllData();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
