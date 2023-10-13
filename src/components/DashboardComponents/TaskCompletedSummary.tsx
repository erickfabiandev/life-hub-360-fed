import { Chart as ChartJS, ArcElement, Legend, Tooltip, plugins } from 'chart.js';
import React, { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Styles from '@/styles/dashboard.module.scss'
import { ITaskList } from '@/types/Task.types';

interface TaskCompletedSummaryProps {
  initialAllTaskListsData: ITaskList[]
}

const TaskCompletedSummary: FC<TaskCompletedSummaryProps> = ({ initialAllTaskListsData }) => {

  ChartJS.register(ArcElement, Tooltip, Legend);

  const totalTasksList = initialAllTaskListsData.length
  const totalTasksListCompleted = initialAllTaskListsData
    .reduce((quanty, tasklist) => tasklist.status === 'COMPLETED' ? quanty + 1 : quanty, 0)

  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: '# of TaskList',
        data: [totalTasksListCompleted, totalTasksList - totalTasksListCompleted],
        backgroundColor: [
          '#229954',
          '#E5E8E8',
        ],
        borderColor: [
          '#145A32',
          '#E5E8E8',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    tooltips: {
      enabled: false,
    },
    cutout: '80%',
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  }
  return (
    <section className={Styles.taskCompletedSummary}>
      <h3 className={Styles.taskCompletedSummary_title}>Overall Progress</h3>
      {
        initialAllTaskListsData.length === 0 &&
        <p style={{ textAlign: 'center', width: '100%', fontSize: '14px', color: '#99A3A4' }}>- No tasks registered- </p>
      }
      {
        initialAllTaskListsData.length > 0 &&
        (
          <>
            <div className={Styles.taskCompletedSummary_content}>
              <Doughnut data={data} updateMode='resize' options={options} />
              <p className={Styles.taskCompletedSummary_content_percentage}>
                {`${totalTasksListCompleted / totalTasksList * 100} %`}<span>Task Completed</span>
              </p>
            </div>
          </>
        )
      }

    </section>
  );
};

export default TaskCompletedSummary;