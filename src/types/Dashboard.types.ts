import { type } from "os";
import { IEvent } from "./Event.types";
import { ITaskList } from "./Task.types";

interface IDashboard {
  LatestEvents: IEvent[],
  LatestTaskLists: ITaskList[]
  AllTaskLists: ITaskList[]
}

export type { IDashboard }