import { ITaskList } from '@/types/Task.types';
import React, { FC, SyntheticEvent, useState } from 'react';
import Styles from '@/styles/modal.module.scss'
import { MdModeEdit, MdCheckBox, MdDisabledByDefault, MdAdd, MdCancel } from "react-icons/md";
import { createTask, updateTask, updateTaskList } from '@/service/TaskListService';
import Task from './Task';
import { ToastComponent } from '../NotificationComponent';
import { useRouter } from 'next/navigation';

interface TaskListDetailProps {
  dataTaskList: ITaskList,
  onChangeTaskList: (updateDataTaskList: ITaskList, status?: 'PENDING' | 'COMPLETED') => void
  onOpenModal: () => void
}

const dataState = [
  {
    status: "PENDING",
    classname: Styles.detail_content_taskpanel_pending
  }, {
    status: "COMPLETED",
    classname: Styles.detail_content_taskpanel_completed
  }
]

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

const TaskListDetail: FC<TaskListDetailProps> = (
  {
    dataTaskList,
    onChangeTaskList,
    onOpenModal }
) => {
  const [title, setTitle] = useState<string>(dataTaskList?.title)
  const [newTask, setNewTask] = useState<string>('')
  const [editTitle, setEditTitle] = useState<boolean>(false)
  const router = useRouter()

  const handleTitleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setTitle(target.value)
  }

  const handleNewTask = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setNewTask(target.value)
  }

  const handleCheckTask = async (idTask: string = '', idTaskList: string = '', status: string) => {
    try {
      const response = await updateTask(idTask, idTaskList, { status })
      ToastComponent('success', response.message)

      const updateDataTasks = dataTaskList.tasks.map((task) =>
        task._id === idTask ? { ...task, status } : task
      )

      const quantityPending = updateDataTasks
        .reduce((quantity, task) => task.status === 'PENDING' ? quantity + 1 : quantity, 0)

      if (quantityPending === 0) {
        onChangeTaskList({ ...dataTaskList, tasks: updateDataTasks }, 'COMPLETED')
      }
      else {
        onChangeTaskList({ ...dataTaskList, tasks: updateDataTasks })
      }

    } catch (error: any) {
      ToastComponent(
        'error',
        error?.response?.data?.message,
        error?.response?.data?.error
      )
    }
  }

  const handleSubmitNewTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const taskCreate = await createTask({ title: newTask }, dataTaskList._id)
      onChangeTaskList({ ...dataTaskList, tasks: [...dataTaskList.tasks, taskCreate] })
      setNewTask('')
      ToastComponent(
        'success',
        'I add a new task successfully'
      )

    } catch (error: any) {
      ToastComponent(
        'error',
        error?.response?.data?.message,
        error?.response?.data?.error
      )
    }
  }

  const handleUpdateTitle = async () => {
    try {
      const response = await updateTaskList(dataTaskList._id, { title })
      onChangeTaskList({ ...dataTaskList, title })
      ToastComponent('success', response?.message)
    } catch (error: any) {
      setTitle(dataTaskList.title)
      ToastComponent(
        'error',
        error?.response?.data?.message,
        error?.response?.data?.error
      )
    } finally {
      setEditTitle(!editTitle)
    }
  }

  const numberTaskByState = (state: string) => {
    const quantity = dataTaskList.tasks.reduce((acumulator, tasks) => tasks.status === state
      ? acumulator + 1
      : acumulator, 0)
    return quantity
  }

  const colorTitle = dataColor.find((_) => _.background === dataTaskList.color)?.colorTitle


  return (
    <section className={Styles.detail}>
      <a className={Styles.detail_closed} style={{ color: `${dataTaskList.color}` }} onClick={onOpenModal}>
        <MdCancel size={30} />
      </a>
      <div
        className={Styles.detail_title}
        style={{
          backgroundColor: dataTaskList.color === '#FBFCFC' ? '#E5E8E8' : dataTaskList.color,
          color: colorTitle
        }}>
        {
          editTitle ?
            (
              <input
                id='title'
                name='title'
                type='text'
                value={title}
                disabled={!editTitle}
                onChange={handleTitleChange}
                style={{ marginBlockEnd: '1em', marginBlockStart: '1em' }}
              />
            ) :
            (
              <>
                <p>{dataTaskList.title}</p>
                <MdModeEdit size={24} className={Styles.icon} onClick={() => setEditTitle(!editTitle)} />
              </>
            )
        }
        {
          editTitle
          && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <MdCheckBox size={24} className={Styles.icon} onClick={() => handleUpdateTitle()} />
              <MdDisabledByDefault size={24} className={Styles.icon} onClick={() => setEditTitle(!editTitle)} />
            </div>
          )
        }
      </div>
      <div className={Styles.detail_content}>
        <form className={Styles.detail_content_addtask} onSubmit={handleSubmitNewTask}>
          <input
            name='titleTask'
            id='titleTask'
            value={newTask}
            onChange={handleNewTask}
            required
          />
          <button type='submit'><MdAdd size={18} /></button>
        </form>
        <div className={Styles.detail_content_taskpanel}>
          {
            dataState.map((_, index) => {
              return (
                <div
                  key={index}
                  className={_.classname}
                  style={{
                    borderTopColor: dataTaskList.color === '#FBFCFC' ? '#E5E8E8' : dataTaskList.color
                  }}>
                  {
                    numberTaskByState(_.status) === 0 ?
                      (
                        <p style={{ textAlign: 'center' }}>
                          {_.status === 'COMPLETED' ? '- No completed tasks - ' : ''}
                        </p>
                      ) : (
                        dataTaskList.tasks
                          .filter((task) => task.status === _.status)
                          .map((task) =>
                            <Task
                              key={task._id}
                              task={task}
                              onChangeTask={() =>
                                handleCheckTask(
                                  task._id,
                                  dataTaskList._id,
                                  task.status === 'PENDING' ? 'COMPLETED' : 'PENDING'
                                )}
                            />
                          ))
                  }
                </div>
              )
            })
          }

        </div>
      </div>
    </section>
  );
};

export default TaskListDetail;