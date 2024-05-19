export interface RegisterModel {
  email: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  email: string;
  username: string;
  password: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface ResetPasswordModel {
  old_password: string;
  new_password: string;
}
