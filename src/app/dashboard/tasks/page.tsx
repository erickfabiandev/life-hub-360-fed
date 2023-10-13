import TaskPanel from '@/components/TaskListComponents/TaskPanel';
import { NextPage } from 'next';
import React from 'react';
import { getAllTaskList } from '@/service/TaskListService'

const Tasks: NextPage = async () => {
  try {
    const initialTaskListsData = await getAllTaskList();
    return (
      <TaskPanel
        initialTaskListsData={initialTaskListsData}
      />
    );
  } catch (error: any) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>{`An error occurred when loading the data: ${error?.response?.data?.message}`}</p>
      </div>
    );
  }
};

export default Tasks;
