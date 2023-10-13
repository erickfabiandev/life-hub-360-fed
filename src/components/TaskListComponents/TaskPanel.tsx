"use client"
import { ITaskList } from '@/types/Task.types';
import React, { FC, useState } from 'react';
import Styles from '@/styles/taskboard.module.scss'
import TaskList from './TaskList';
import { MdSearch, MdOutlinePostAdd } from "react-icons/md";
import { deleteTaskList, updateTaskList } from '@/service/TaskListService';
import { ToastComponent } from '../NotificationComponent';
import ModalLayout from '../Modal/ModalLayout';
import TaskListForm from './TaskListForm';
import { usePathname, useRouter } from 'next/navigation';

const stateTask = [
  { state: 'Pending', classname: Styles.taskboard_panel_pending },
  { state: 'Completed', classname: Styles.taskboard_panel_completed }
]

const TaskPanel: FC<{ initialTaskListsData: ITaskList[] }> = ({ initialTaskListsData }) => {

  const [taskLists, setTaskLists] = useState<ITaskList[]>(initialTaskListsData)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const router = useRouter()
  const path = usePathname()

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  const handleAddTaskLists = (newTaskList: ITaskList) => {
    setTaskLists([...taskLists, newTaskList])
  }

  const handleDeleteTaskLists = async (idTaskList: string) => {
    try {
      const response = await deleteTaskList(idTaskList)
      const index = taskLists.findIndex((current) => current._id === idTaskList)
      const updateDataTaskLists = [...taskLists]
      updateDataTaskLists.splice(index, 1)
      setTaskLists([...updateDataTaskLists])
      ToastComponent('success', response?.message)
    } catch (error: any) {
      ToastComponent('error',
        error?.response?.data?.message,
        error?.response?.data?.error)
    }
  }

  const handleChangeTaskLists = (updateDataTaskList: ITaskList, status?: 'PENDING' | 'COMPLETED') => {

    const updateDataTaskLists = taskLists.map(
      (taskList) => taskList._id === updateDataTaskList._id
        ? (!status ? updateDataTaskList : { ...updateDataTaskList, status })
        : taskList)
    if (status && updateDataTaskList._id) {
      handleChangeStatusTaskLists(updateDataTaskList._id, status)
    }
    setTaskLists(updateDataTaskLists)
  }

  const handleChangeStatusTaskLists = async (idTaskList: string, status: 'PENDING' | 'COMPLETED') => {
    try {
      const response = await updateTaskList(idTaskList, { status })
      ToastComponent('success', response?.message)
    } catch (error: any) {
      ToastComponent(
        'error',
        error?.response?.data?.message,
        error?.response?.data?.error)
    }
  }

  const numberTaskListsByState = (state: string) => {
    const quantity = taskLists.reduce((acumulator, tasksList) => tasksList.status === state ? acumulator + 1 : acumulator, 0)
    return quantity
  }

  return (
    <section className={Styles.taskboard}>
      <h3 className={Styles.taskboard_title}> Task Boards</h3>
      <div className={Styles.taskboard_actions}>
        <div style={{ position: 'relative' }}>
          <input
            type='text'
            placeholder='Search Tasks'
            className={Styles.taskboard_actions_search}
          />
          <MdSearch
            className={Styles.taskboard_actions_search_icon}
          />
        </div>
        <a className={Styles.taskboard_actions_add} onClick={handleOpenModal}>
          <span> <MdOutlinePostAdd size={25} /></span>
          New Task
        </a>
      </div>
      <div className={Styles.taskboard_panel}>
        {
          stateTask.map((_, index) => {
            return (
              <div key={index} className={_.classname}>
                <p className={Styles.title}>{_.state}<span>
                  {
                    numberTaskListsByState(_.state.toLocaleUpperCase())
                  }</span></p>
                <div className={Styles.container}>
                  {
                    numberTaskListsByState(_.state.toLocaleUpperCase()) === 0
                      ? (
                        <p style={{ textAlign: 'center' }}>
                          {_.state === 'Ccompleted' ? '- No completed task lists - ' : '- No pending task lists -'}
                        </p>
                      ) : (
                        taskLists
                          .filter((tasksList) => tasksList.status === _.state.toLocaleUpperCase())
                          .map((tasksList) => {
                            return (
                              <TaskList
                                key={tasksList._id}
                                taskListData={tasksList}
                                onChangeTaskLists={handleChangeTaskLists}
                                onDeleteTaskLists={handleDeleteTaskLists}
                              />
                            )
                          })
                      )
                  }
                </div>
              </div>
            )
          })
        }
      </div>
      {
        isOpenModal &&
        <ModalLayout>
          <TaskListForm
            onOpenModal={handleOpenModal}
            onAddTaskList={handleAddTaskLists}
          />
        </ModalLayout>
      }
    </section>
  );
};

export default TaskPanel;