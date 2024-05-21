export interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  status: string;
}

export interface TaskResponse {
  status: number;
  data: Task[] | undefined;
}
