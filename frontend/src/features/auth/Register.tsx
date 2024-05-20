import axios, { Axios, AxiosError } from 'axios';
import RegisterForm from '../../components/form/RegisterForm';
import { RegisterFormValues } from '../../interfaces/form';
import Cookies from 'js-cookie'
import { Component } from "react";
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
    const token = Cookies.get('token');
    const navigate = useNavigate();

    const handleRegister = async (data: RegisterFormValues) => {
        try {
            const dataJSON = {
                email : data.email,
                password: data.password,
                user:{
                    name: data.name
                }
            };

            const response = await axios.post(
                'http://localhost:8000/register',dataJSON
                ,{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Đăng ký thành công', response);

            navigate("/login")
        } catch (error: any) {
            console.error('Đăng ký thất bại', error.response?.data.message, error);
        }
    }
    
    if (token) {
        return <Navigate to="/task" />;
    } else {
        return (
            <>
                <RegisterForm onRegister={handleRegister}/>
            </>
        );
    }
};

export default Register;
