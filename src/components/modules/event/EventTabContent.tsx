'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { EventResponseType } from '@/actions/event-service';
import EventTab from '@/components/ui/event/EventTab';

interface EventTabContentProps {
  events: EventResponseType[];
  activeEventId?: string;
}

export default function EventTabContent({ events, activeEventId }: EventTabContentProps) {
  const router = useRouter();

  const handleEventClick = (eventUuid: string) => {
    router.push(`?eventId=${eventUuid}`, { scroll: false });
  };

  return (
    <div className='flex justify-center'>
      <div className='flex overflow-x-auto hide-scrollbar'>
        {events.map((event) => (
          <div key={event.eventUuid} className='flex-shrink-0'>
            <EventTab
              title={event.title}
              isActive={activeEventId === event.eventUuid}
              onClick={() => handleEventClick(event.eventUuid)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
