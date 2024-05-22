export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface TaskAddFormValues {
  name: string;
  dueDate: string;
  description: string;
  status: string;
}
