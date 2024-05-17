import { Container, Row } from 'react-bootstrap'
import { FloatingLabel, Button, Card } from "flowbite-react";
const ChangePasswordForm = () => {
    return (
        <Container>
            <Card className="max-w-m">
                <Row>
                    <h1>Nhập Mật Khẩu Mới</h1>
                    <FloatingLabel variant="outlined" label="Password" />
                </Row>
                <Row>
                    <h1>Nhập Lại Mật Khẩu</h1>
                    <FloatingLabel variant="outlined" label="Re-Password" />
                </Row>
                <Row>
                    <Button color="blue" pill>
                        Đổi Mật Khẩu
                    </Button>
                </Row>
            </Card>
        </Container>
    )
}

export default ChangePasswordForm