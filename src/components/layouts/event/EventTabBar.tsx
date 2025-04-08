'use client';
import React from 'react';
import EventTabContent from '@/components/modules/event/EventTabContent';
import { EventResponseType } from '@/actions/event-service';

interface EventTabBarProps {
  events: EventResponseType[];
  activeEventId?: string;
}

export default function EventTabBar({ events, activeEventId }: EventTabBarProps) {
  return (
    <div className='w-full border-b border-stroke-100 flex justify-center'>
      <div className='max-w-3xl w-full'>
        <EventTabContent events={events} activeEventId={activeEventId} />
      </div>
    </div>
  );
}
