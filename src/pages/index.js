import EventList from '../components/events/EventList';
import {getFeaturedEvents} from '../helpers/api-util';
import Head from 'next/head';
import NewsletterRegistration from '../components/input/newsletter-registration';
export default function RootPage(props) {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of events in our website!" />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 600,
  };
}
