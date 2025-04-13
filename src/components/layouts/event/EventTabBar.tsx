'use client';
import React from 'react';

import EventTabContent from '@/components/modules/event/EventTabContent';
import { EventResponseType } from '@/actions/event-service';

interface EventTabBarProps {
  events: EventResponseType[];
  activeEventId?: string;
}

export default function EventTabBar({
  events,
  activeEventId,
}: EventTabBarProps) {
  return (
    <section className='sticky top-0 z-10 max-w-3xl w-full border-b border-stroke-100 flex justify-center bg-white'>
      <EventTabContent events={events} activeEventId={activeEventId} />
    </section>
  );
}
