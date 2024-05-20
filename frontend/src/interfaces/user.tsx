export interface User{
    id: number,
    name: string;
    dob: Date;
    gender: Boolean;
    phone: string;
    address: string;
}
export interface UserUpdated{
    name: string;
    dob: string;
    gender: Boolean;
    phone: string;
    address: string;
}