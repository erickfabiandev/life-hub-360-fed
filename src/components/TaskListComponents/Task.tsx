import { ITask } from '@/types/Task.types';
import React, { FC } from 'react';
import Styles from '@/styles/taskboard.module.scss'

interface TaskProps {
  task: ITask
  onChangeTask: () => void
}

const Task: FC<TaskProps> = ({ task, onChangeTask }) => {

  return (
    <div className={Styles.task}>
      <input
        id={task._id}
        name={task._id}
        type='checkbox'
        checked={task.status === 'PENDING' ? false : true}
        onChange={onChangeTask}
        className={Styles.task_check}
      />
      <label
        htmlFor={task._id}
        className={task.status === 'PENDING' ? `${Styles.task_pending}` : Styles.task_completed}
      >
        {
          task.title
        }
      </label>

    </div>
  );
};

export default Task;