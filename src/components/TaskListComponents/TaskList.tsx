"use client"
import { FC, useState } from "react"
import Styles from '@/styles/taskboard.module.scss'
import { ITaskList } from "@/types/Task.types";
import { MdDeleteForever, MdLaunch, MdCheckCircle } from "react-icons/md";
import ModalLayout from "../Modal/ModalLayout";
import { MessageConfirmation } from "../NotificationComponent";
import TaskListDetail from "./TaskListDetail";
import CompletedTaskListDetail from "./CompletedTaskListDetail";

interface TaskListProps {
  taskListData: ITaskList,
  onChangeTaskLists: (updateDataTaskList: ITaskList, status?: 'PENDING' | 'COMPLETED') => void;
  onDeleteTaskLists: (idTaskList: string) => void
}

const dataColor = [
  {
    background: '#FFE8F2',
    colorTitle: '#DB2777'
  },
  {
    background: '#D6EAF8',
    colorTitle: '#2563EB'
  },
  {
    background: '#FDEBD0',
    colorTitle: '#CA8A04'
  },
  {
    background: '#EAE6FD',
    colorTitle: '#9333EA'
  },
  {
    background: '#FBFCFC',
    colorTitle: '#17202A'
  }
]

const TaskList: FC<TaskListProps> = (
  {
    taskListData,
    onChangeTaskLists,
    onDeleteTaskLists
  }) => {
  const [openTodoListModal, setOpenTodoListModal] = useState<boolean>(false);
  const [openCompletedTasksModal, setOpenCompletedTasksModal] = useState<boolean>(false);

  const handleTodoListModal = () => {
    setOpenTodoListModal(!openTodoListModal)
  }
  const handleCompletedTasksModal = () => {
    setOpenCompletedTasksModal(!openCompletedTasksModal)
  }

  const handleDelete = () => {
    MessageConfirmation(
      'Are you sure to delete task list',
      'Yes, delete it!',
      'No, cancel',
      () => taskListData._id && onDeleteTaskLists(taskListData._id)
    )
  }

  const colorTitle = dataColor.find((_) => _.background === taskListData.color)?.colorTitle

  return (
    <>
      {
        taskListData.status === 'PENDING' &&
        <div className={Styles.tasklist_pending} style={{ backgroundColor: `${taskListData.color}` }}>
          <MdDeleteForever size={20} className={Styles.tasklist_pending_icon} onClick={() => handleDelete()} />
          <p className={Styles.tasklist_pending_title} style={{ color: colorTitle }}>{taskListData.title}</p>
          <div className={Styles.overview}>
            <a className={Styles.overview_tag}>
              {
                `${taskListData.tasks.filter((task) => task.status === 'PENDING').length} To Do`
              }
            </a>
            <a className={Styles.overview_tag}>
              {
                `${taskListData.tasks.filter((task) => task.status === 'COMPLETED').length} Done `
              }
            </a>
          </div>
          <a className={Styles.tasklist_pending_details} onClick={handleTodoListModal}>
            <MdLaunch />
            View details
          </a>
        </div>
      }
      {
        taskListData.status === 'COMPLETED' &&
        <div className={Styles.tasklist_completed}>
          <MdCheckCircle size={18} style={{ color: '#219653' }} />
          <p onClick={handleCompletedTasksModal}>
            {taskListData.title}
          </p>
          <MdDeleteForever size={20} className={Styles.tasklist_completed_delete} onClick={() => handleDelete()} />
        </div>
      }
      {
        openTodoListModal &&
        <ModalLayout>
          <TaskListDetail
            dataTaskList={taskListData}
            onChangeTaskList={onChangeTaskLists}
            onOpenModal={handleTodoListModal}
          />
        </ModalLayout>
      }
      {
        openCompletedTasksModal &&
        <ModalLayout>
          <CompletedTaskListDetail
            dataTaskList={taskListData}
            onOpenModal={handleCompletedTasksModal}
          />
        </ModalLayout>
      }
    </>

  )
};

export default TaskList;