export interface GetAllTaskResponse {
  id: string;
  title: string;
  status: string;
}

export interface TaskModel {
  title: string;
}

export interface TaskParams {
  id: string;
}

export interface UpdateTaskModel {
  id: string;
  title: string;
}

export interface UpdateStatusTaskModel {
  id: string;
  status: string;
}

export
