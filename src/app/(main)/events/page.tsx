import React from 'react';

import EventTabBar from '@/components/layouts/event/EventTabBar';
import { getDetailEventDummy, getEventsDummy } from '@/actions/event-service';
import EventDetailSection from '@/components/layouts/event/EventDetailSection';

type EventSearchParamsType = {
  eventId: string;
  title: string;
};

type SearchParams = Promise<EventSearchParamsType>;

export default async function EventsPage(props: { searchParams: SearchParams }) {
  // const events = await getEvents(0,10);
  const events = await getEventsDummy();

  const searchParams = await props.searchParams;

  let activeEventId = searchParams.eventId;
  if (!activeEventId && events.length > 0) {
    activeEventId = events[0].eventUuid;
  }
  //   const eventDetail = await getDetailEvent(searchParams.eventId);

  const eventDetail = await getDetailEventDummy(searchParams.eventId);
  return (
    <main>
      <EventTabBar events={events} activeEventId={activeEventId} />

      {/* TODO: 이벤트 상세 정보 와야함 */}
      <EventDetailSection eventDetail={eventDetail} />
    </main>
  );
}
