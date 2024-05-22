import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Card, Label, TextInput } from "flowbite-react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { AccountUpdated } from '../../interfaces/user';
const ChangePasswordForm: React.FC = () => {
    const token = Cookies.get('token');
    const [passwordData, setPasswordData] = useState<AccountUpdated>({
        current_password: '',
        new_password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setConfirmPassword(value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (passwordData.new_password && passwordData.new_password === confirmPassword) {
            axios
            axios.post('http://127.0.0.1:8000/accounts/changePassword', passwordData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    setSuccess('Password updated successfully');
                    setError(null);
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.status === 401) {
                            console.error('Unauthorized. Please log in again.');
                        } else if (error.response.status === 400) {
                            setError('Incorrect current password.');
                        } else if (error.response.status === 422) {
                            setError('Validation error. Please check your input.');
                        } else {
                            console.error('An error occurred. Please try again later.');
                        }
                    } else {
                        console.error('An error occurred. Please try again later.');
                    }
                });
        } else {
            setError('Passwords do not match');
        }
    };

    return (
        <Card className="max-w-4xl flex-1 m-20">
            <form onSubmit={handleSubmit}>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="current_password" value="Mật khẩu cũ" />
                    </div>
                    <TextInput
                        id="current_password"
                        name="current_password"
                        type="password"
                        value={passwordData.current_password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="new_password" value="Nhập mật khẩu mới" />
                    </div>
                    <TextInput
                        id="new_password"
                        name="new_password"
                        type="password"
                        value={passwordData.new_password}
                        onChange={handlePasswordChange}
                        required
                    />
                    {/* Consider adding a password strength indicator here */}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="confirmPassword" value="Nhập lại mật khẩu mới" />
                    </div>
                    <TextInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                </div>
                <Button type="submit" className='mt-5'>Đổi</Button>
            </form>
        </Card>
    );
};

export default ChangePasswordForm;
