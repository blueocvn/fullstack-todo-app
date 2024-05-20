import { Container, Row, Form } from 'react-bootstrap';
import { FloatingLabel, Button, Card } from "flowbite-react";
import axios from 'axios';
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

interface User {
    fullName: string;
    birthDate: string;
    gender: string;
    phoneNumber: string;
    address: string;
}

const EditUserProfile: React.FC = () => {
    const id = sessionStorage.getItem('currUser');
    const [userEdited, setUserEdited] = useState<User>({
        fullName: '',
        birthDate: '',
        gender: '',
        phoneNumber: '',
        address: '',
    });

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/accounts/me`)
            .then((res) => {
                setUserEdited({
                    fullName: res.data.fullName,
                    birthDate: res.data.birthDate,
                    gender: res.data.gender,
                    phoneNumber: res.data.phoneNumber,
                    address: res.data.address,
                });
            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserEdited((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .put(`http://localhost:9999/user/${id}`, userEdited)
            .then((res) => {
                console.log('User updated successfully:', res.data);
            })
            .catch((error) => console.log(error));
    };

    return (
        <Container>
            <Card className="max-w-md">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group controlId="fullName">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={userEdited.fullName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="birthDate">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control
                                type="date"
                                name="birthDate"
                                value={userEdited.birthDate}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="gender">
                            <Form.Label>Giới tính</Form.Label>
                            <Form.Control
                                type="text"
                                name="gender"
                                value={userEdited.gender}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="phoneNumber">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={userEdited.phoneNumber}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="address">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={userEdited.address}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Button type="submit" >
                            Cập Nhật
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default EditUserProfile;
