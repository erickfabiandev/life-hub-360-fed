"use client";
import React, { useState, useCallback, useMemo } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Styles from '@/styles/calendarPanel.module.scss'
import Swal from 'sweetalert2';
import { createEvent } from '@/service/EventService'
import { IEvent } from '@/types/Event.types';

interface CalendarPanelProps {
  events: IEvent[];
}

const mLocalizer = momentLocalizer(moment)

export default function CalendarPanel({ events }: CalendarPanelProps) {

  const [myEvents, setEvents] = useState<IEvent[]>(events ?? []);
  const [view, setView] = useState(Views.WEEK)
  const [date, setDate] = useState(new Date())

  const onNavigate = useCallback((newDate: any) => setDate(newDate), [setDate])

  const handleSelectSlot = useCallback(
    async ({ start, end }: { start: Date; end: Date }) => {

      const startDate = new Date(start);
      const formattedStartDate = startDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });

      const endDate = new Date(end);
      const formattedEndDate = endDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });

      const { value: title } = await Swal.fire({
        title: 'Event creation',
        input: 'text',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        html: `An event will be created with 
        <p><b>START DATE :</b> ${formattedStartDate}</p> 
        <p><b>END DATE :</b> ${formattedEndDate}</p>`,
        inputPlaceholder: 'Enter your event title',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          }
        }
      })

      if (title) {
        try {
          await createEvent({ start, end, title })
          setEvents((prev) => [...prev, { start, end, title }]);
          Swal.fire({
            icon: 'success',
            title: 'Event created successfully',
            showConfirmButton: false,
            timer: 1500
          })
        } catch (error: any) {
          Swal.fire(
            'Error!',
            `${error.response.data.message} : ${error.response.data.error}`,
            'error'
          )
        }
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event: IEvent) => {
      const startDate = new Date(event.start);
      const formattedStartDate = startDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });

      const endDate = new Date(event.end);
      const formattedEndDate = endDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });

      Swal.fire({
        icon: 'info',
        title: event.title,
        html: `
        <p><b>START DATE :</b> ${formattedStartDate}</p> 
        <p><b>END DATE :</b> ${formattedEndDate}</p>`,
        showConfirmButton: true,
      })
    },
    []
  );

  const onView = useCallback((newView: any) => setView(newView), [setView])

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  return (
    <div className={Styles.calendarPanel}>
      <Calendar
        date={date}
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        events={myEvents}
        localizer={mLocalizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        view={view as any}
        onView={onView}
        onNavigate={onNavigate}
      />
    </div>
  );
}


