export interface RegisterFormValues {
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
  due_date: string;
  description: string;
  status: boolean;
}
