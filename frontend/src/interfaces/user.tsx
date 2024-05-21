export interface User {
  id: number;
  name: string;
  email: string;
  dob: Date;
  gender: boolean;
  phone: string;
  address: string;
}
export interface UserUpdated {
  name: string;
  dob: string;
  gender: boolean;
  phone: string;
  address: string;
}
