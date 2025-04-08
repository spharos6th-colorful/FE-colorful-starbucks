import React from 'react';

import EventTabBar from '@/components/layouts/event/EventTabBar';
import { getEventsDummy } from '@/actions/event-service';

type EventSearchParamsType = {
  eventId?: string;
  title?: string;
};

type SearchParams = Promise<EventSearchParamsType>;

export default async function EventsPage(props: { searchParams: SearchParams }) {
  // const events = await getEvents(0,10);
  const events = await getEventsDummy();

  const searchParams = await props.searchParams;

  const activeEventId = searchParams.eventId || (events.length > 0 ? events[0].eventUuid : '');

  return (
    <main>
      <EventTabBar events={events} activeEventId={activeEventId} />
    </main>
  );
}
