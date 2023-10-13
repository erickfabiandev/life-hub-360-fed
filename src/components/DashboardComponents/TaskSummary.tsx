import { ITaskList } from '@/types/Task.types';
import React, { FC } from 'react';
import Styles from '@/styles/dashboard.module.scss'

interface TaskSummary {
  initialLatestTaskListsData: ITaskList[]
}

const TaskSummary: FC<TaskSummary> = ({ initialLatestTaskListsData }) => {

  return (
    <section className={Styles.taskSummary}>
      <h3 className={Styles.taskSummary_title}>Recent Tasks List</h3>
      {
        initialLatestTaskListsData.length === 0 &&
        <p style={{ textAlign: 'center', width: '100%', fontSize: '14px', color: '#99A3A4' }}>- no recent tasks list -</p>
      }
      {
        initialLatestTaskListsData.length > 0 &&
        initialLatestTaskListsData.map((tasksList) => {
          const taskCompleted = tasksList.tasks
            .reduce((quanty, task) => task.status === 'COMPLETED' ? quanty + 1 : quanty, 0)
          const numberTask = tasksList.tasks.length
          return (
            <div key={tasksList._id} className={Styles.taskSummary_content}>
              <p className={Styles.taskSummary_content_title}>
                {tasksList.title}
              </p>
              <meter min={0} max={1} low={0.25} high={0.75} optimum={1}
                value={taskCompleted / numberTask} style={{ width: '100%' }} />
              <p className={Styles.taskSummary_content_statistics}>{`${taskCompleted}/${numberTask}`}</p>
            </div>
          )
        }
        )
      }

    </section>
  );
};

export default TaskSummary;