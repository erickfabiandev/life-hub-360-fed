import CalendarPanel from '@/components/CalendarPanel';
import { getAllEvent } from '@/service/EventService';
import { Suspense } from 'react';

interface Event {
  title: string,
  end: Date,
  start: Date
}

export default async function Calendar() {
  try {

    const events = await getAllEvent()

    const eventsFormat = events.map((event: Event) => {
      return {
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end)
      }
    })
    return (
      <CalendarPanel events={eventsFormat} />
    );

  } catch (error: any) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>{`An error occurred when loading the data: ${error?.response?.data?.message}`}</p>
      </div>
    );
  }
};




