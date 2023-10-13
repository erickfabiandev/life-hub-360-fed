interface ITask {
  _id?: string,
  title: string,
  status?: string,
  createdAt?: string,
  updatedAt?: string
}
interface ITaskList {
  _id?: string,
  title: string,
  status?: string,
  color: string,
  tasks: ITask[],
  createdAt?: string,
  updatedAt?: string
}
export type { ITask, ITaskList }