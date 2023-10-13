import React from 'react';
import { NextPage } from 'next';
import DashboardPanel from '@/components/DashboardComponents/DashboardPanel';
import { getAllTaskList, getLatestTasksLists } from '@/service/TaskListService';
import { getAllEvent, getLatestEventsForUser } from '@/service/EventService';
import { ITaskList } from '@/types/Task.types';
import { IEvent } from '@/types/Event.types';

const Dashboard: NextPage = async () => {
  try {
    const [taskLists, events, allTaskList] = await Promise.all([getLatestTasksLists(), getLatestEventsForUser(), getAllTaskList()])
    const initialdashboardData: {
      LatestTaskLists: ITaskList[];
      LatestEvents: IEvent[];
      AllTaskLists: ITaskList[]
    } = {
      LatestTaskLists: taskLists,
      LatestEvents: events,
      AllTaskLists: allTaskList
    }
    return (
      <DashboardPanel
        initialdashboardData={initialdashboardData}
      />
    );
  } catch (error: any) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>An error occurred when loading the data</p>
      </div>
    );
  }
};

export default Dashboard;