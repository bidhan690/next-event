import {Fragment} from 'react';
import {getEventById, getFeaturedEvents} from '../../helpers/api-util';
import Head from 'next/head';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import Comments from '../../components/input/comments';

export default function SpecificEventPage(props) {
  const event = props.getEvent;
  if (!event) {
    return <h1>Event Not Found</h1>;
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content="All Events in our page" />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const {params} = context;
  const path = params.id;

  const event = await getEventById(path);

  return {
    props: {
      getEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const path = events.map((event) => ({params: {id: event.id}}));
  return {
    paths: path,
    fallback: true,
  };
}
