export interface GetAllTaskResponse {
  id: string;
  title: string;
  status: string;
}

export interface TaskModel {
  title: string;
  team_id?: string
}

export interface TaskParams {
  id: string;
}
