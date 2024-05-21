import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Button, Card, Label, TextInput, Radio } from "flowbite-react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserUpdated } from '../../interfaces/user';

const EditUserProfile: React.FC = () => {
    const token = Cookies.get('token');
    const [id, setId] = useState<number | null>(null);
    const [userEdited, setUserEdited] = useState<UserUpdated>({
        name: '',
        dob: '',
        gender: false,
        phone: '',
        address: '',
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/accounts/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const userData: UserUpdated = {
                    name: res.data.user.name,
                    dob: formatDate(new Date(res.data.user.dob)),
                    gender: res.data.user.gender,
                    phone: res.data.user.phone,
                    address: res.data.user.address,
                };
                setUserEdited(userData);
                setId(res.data.user.id);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized. Please log in again.');
                } else {
                    console.error('An error occurred. Please try again later.');
                }
            });
    }, [token]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserEdited((prevState) => ({
            ...prevState,
            [name]: name === 'gender' ? value === 'male' : (name === 'dob' ? new Date(value) : value),
        }));
    };

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setUserEdited((prevState) => ({
            ...prevState,
            gender: value === 'male',
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userEdited);
        axios
            .put(`http://127.0.0.1:8000/api/users/${id}`, userEdited, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log('User updated successfully:', res.data);
                setError('User updated successfully');
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        console.error('Unauthorized. Please log in again.');
                    } else if (error.response.status === 422) {
                        setError('Validation error. Please check your input.');
                    } else {
                        console.error('An error occurred. Please try again later.');
                    }
                } else {
                    console.error('An error occurred. Please try again later.');
                }
            });
    };

    const formatDate = (date: Date): string => {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return '';
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <Card className="max-w-4xl flex-1 m-20">
            <form onSubmit={handleSubmit}>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Họ và tên" />
                    </div>
                    <TextInput
                        id="name"
                        name="name"
                        type="text"
                        value={userEdited.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <div className="mb-4 block">
                        <Label htmlFor="dob" value="Ngày sinh" />
                    </div>
                    <TextInput
                        id="dob"
                        name="dob"
                        type="date"
                        value={userEdited.dob}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="gender" value="Giới tính" />
                    </div>
                    <div className='flex gap-5'>
                        <div>
                            <Label htmlFor="male" value="Nam" className='pr-1' />
                            <Radio
                                id="male"
                                name="gender"
                                value="male"
                                checked={userEdited.gender === true}
                                onChange={handleRadioChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="female" value="Nữ" className='pr-1' />
                            <Radio
                                id="female"
                                name="gender"
                                value="female"
                                checked={userEdited.gender === false}
                                onChange={handleRadioChange}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Số điện thoại" />
                    </div>
                    <TextInput
                        id="phone"
                        name="phone"
                        type="text"
                        value={userEdited.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="address" value="Địa chỉ" />
                    </div>
                    <TextInput
                        id="address"
                        name="address"
                        type="text"
                        value={userEdited.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button type="submit" className='mt-5'>Save</Button>
            </form>
        </Card>
    );
};

export default EditUserProfile;
