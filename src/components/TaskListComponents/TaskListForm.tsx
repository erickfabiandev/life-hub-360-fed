"use client"
import React, { FC, SyntheticEvent, useState } from 'react';
import Style from '@/styles/modal.module.scss'
import { ITask, ITaskList } from '@/types/Task.types';
import { MdAddBox, MdKeyboardArrowRight, MdDeleteForever } from 'react-icons/md'
import { MessageComponent, ToastComponent } from '../NotificationComponent';
import { createTaskList } from '@/service/TaskListService';

interface TaskListFormProps {
  onOpenModal: () => void,
  onAddTaskList: (newTaskList: ITaskList) => void

}

const TaskListForm: FC<TaskListFormProps> = ({ onOpenModal, onAddTaskList }) => {

  const [newTaskList, setnewTaskList] = useState<ITaskList>({
    title: '',
    color: '#FBFCFC',
    tasks: []
  })

  const [newTask, setNewTask] = useState<ITask>({
    title: ''
  })

  const [error, setError] = useState<string>('')

  const hanldeCancel = () => {
    resetValues()
    onOpenModal()
  }

  const handleChangeTaskList = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setnewTaskList({ ...newTaskList, [target.name]: target.value })
  }

  const handleChangeTask = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setNewTask({ title: target.value })
    setError('')
  }

  const addTask = (title: string) => {
    if (!title.trim()) {
      setError('Title can not be empty')
    }
    else {
      setNewTask({ title: '' })
      setError('')
      setnewTaskList({ ...newTaskList, tasks: [...newTaskList.tasks, newTask] })
    }
  }

  const handleDeleteTask = (index: number) => {
    const updateTasks = [...newTaskList.tasks]
    updateTasks.splice(index, 1)
    setnewTaskList({ ...newTaskList, tasks: [...updateTasks] })
  }

  const resetValues = () => {
    setNewTask({
      title: ''
    })
    setnewTaskList({
      title: '',
      color: '#FBFCFC',
      tasks: []
    })
    setError('')
  }

  const hanldeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (newTaskList.tasks.length === 0) {
        MessageComponent('error', 'Creation error', 'The task list must have at least 1 task.')
      } else {
        const listCreated = await createTaskList(newTaskList)
        ToastComponent('success', 'List created successfully')
        onAddTaskList(listCreated)
        resetValues()
        onOpenModal()
      }
    } catch (error: any) {
      MessageComponent('error', 'Error', error?.response?.data?.error)
    }
  }

  return (
    <form className={Style.form} onSubmit={hanldeSubmit}>
      <h3 className={Style.form_title}>Create Task List</h3>
      <section className={Style.form_content}>
        <label
          htmlFor={'title'}
        >
          Title
        </label>
        <input
          id='titleList'
          name='title'
          type='text'
          value={newTaskList.title}
          required
          placeholder='Enter title'
          className={Style.title}
          onChange={handleChangeTaskList}
        />
        <label htmlFor='color'>Color</label>
        <div className={Style.form_content_color}>
          <input
            id='white'
            name='color'
            type='radio'
            value='#FBFCFC'
            required
            className={Style.form_content_color_white}
            onChange={handleChangeTaskList}
            checked={newTaskList.color === '#FBFCFC'}
          />
          <input
            id='red'
            name='color'
            type='radio'
            value='#FFE8F2'
            required
            className={Style.form_content_color_red}
            onChange={handleChangeTaskList}
            checked={newTaskList.color === '#FFE8F2'}
          />
          <input
            id='blue'
            name='color'
            type='radio'
            value='#D6EAF8'
            required
            className={Style.form_content_color_blue}
            onChange={handleChangeTaskList}
            checked={newTaskList.color === '#D6EAF8'}
          />
          <input
            id='orange'
            name='color'
            type='radio'
            value='#FDEBD0'
            required
            className={Style.form_content_color_orange}
            onChange={handleChangeTaskList}
            checked={newTaskList.color === '#FDEBD0'}
          />
          <input
            id='violet'
            name='color'
            type='radio'
            value='#EAE6FD'
            required
            className={Style.form_content_color_violet}
            onChange={handleChangeTaskList}
            checked={newTaskList.color === '#EAE6FD'}
          />
        </div>
        <label>
          Task
        </label>
        <div className={Style.form_content_addtask}>
          <input
            id='title'
            name='title'
            value={newTask.title}
            type='text'
            placeholder='Enter new task'
            onChange={handleChangeTask}
          />
          <a>
            <MdAddBox size={30} onClick={() => addTask(newTask.title)} />
          </a>
        </div>
        {
          <p style={{ color: '#E74C3C', fontSize: '12px', margin: '0' }}>{error}</p>
        }
        <div className={Style.form_content_tasks}>
          {
            newTaskList.tasks.map((task, index) => {
              return (
                <div key={index} className={Style.form_content_tasks_task}>
                  <MdKeyboardArrowRight size={20} style={{ color: '#1B4F72' }} />
                  <p style={{ width: '80%', wordWrap: 'break-word', fontSize: '14px' }}>
                    {task.title}
                  </p>
                  <a onClick={() => handleDeleteTask(index)}>
                    <MdDeleteForever size={20} className={Style.delete} />
                  </a>
                </div>
              )
            })
          }
        </div>
        <div className={Style.form_content_buttons}>
          <button type='button' className={Style.cancel} onClick={() => hanldeCancel()}>Cancel</button>
          <button type='submit' className={Style.save}>Save</button>
        </div>
      </section>
    </form>
  );
};

export default TaskListForm;