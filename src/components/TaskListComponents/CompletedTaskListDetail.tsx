import { ITaskList } from '@/types/Task.types';
import React, { FC } from 'react';
import Styles from '@/styles/modal.module.scss'
import { MdTaskAlt, MdCancel } from 'react-icons/md'

interface CompletedTaskListDetailProps {
  dataTaskList: ITaskList,
  onOpenModal: () => void
}

const CompletedTaskListDetail: FC<CompletedTaskListDetailProps> = ({
  dataTaskList,
  onOpenModal
}) => {
  const dateCreated = dataTaskList.createdAt && new Date(dataTaskList.createdAt);
  const formattedDateCreated = dateCreated && dateCreated.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  const endDate = dataTaskList.updatedAt && new Date(dataTaskList.updatedAt);
  const formattedEndDate = endDate && endDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return (
    <section className={Styles.completedList}>
      <a className={Styles.completedList_closed} onClick={onOpenModal}>
        <MdCancel size={30} />
      </a>
      <h3 className={Styles.completedList_title}>{dataTaskList.title}</h3>
      <p><span>{`Date Created: `}</span>{formattedDateCreated}</p>
      <p><span>{`End Date: `}</span>{formattedEndDate}</p>
      <p><span>{`Total number of tasks: `}</span>{dataTaskList.tasks.length}</p>
      <div className={Styles.completedList_tasks}>
        {
          dataTaskList.tasks.map((task) =>
            <p key={task._id}><span><MdTaskAlt size={20} /></span>{task.title}</p>
          )
        }
      </div>
    </section>
  );
};

export default CompletedTaskListDetail;