import { IEvent } from '@/types/Event.types';
import React, { FC } from 'react';
import Styles from '@/styles/dashboard.module.scss'
import { MdEvent } from 'react-icons/md'
interface EventSummaryProps {
  initialLatestEventsData: IEvent[]
}

const EventSummary: FC<EventSummaryProps> = ({ initialLatestEventsData }) => {
  return (
    <section className={Styles.eventSummary}>
      <h3 className={Styles.eventSummary_title}>Recent Events</h3>
      <p className={Styles.eventSummary_date}>
        {new Date().toLocaleDateString('en-US', {
          month: 'short',
          year: '2-digit'
        })}
      </p>
      <div className={Styles.eventSummary_content}>
        {
          initialLatestEventsData.length === 0 &&
          <p style={{ textAlign: 'center', width: '100%', fontSize: '14px', color: '#99A3A4' }}>- no events are scheduled  -</p>
        }
        {
          initialLatestEventsData.length > 0 &&
          (
            initialLatestEventsData.map((event) =>
              <div key={event._id} className={Styles.eventSummary_content_event}>
                <MdEvent size={15} className={Styles.eventSummary_content_event_icon} />
                <p className={Styles.eventSummary_content_event_title}>{event.title}</p>
                <p className={Styles.eventSummary_content_event_date}>
                  {new Date(event.start).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )
          )
        }

      </div>




    </section>
  );
};

export default EventSummary;