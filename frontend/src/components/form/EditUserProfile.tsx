import { Container, Row } from 'react-bootstrap'
import { FloatingLabel, Button, Card } from "flowbite-react";
const EditUserform = () => {
    return (
        <Container>
            <Card className="max-w-m">
                <Row>
                    <h1>Họ và tên</h1>
                    <FloatingLabel variant="outlined" label="Label" />
                </Row>
                <Row>
                    <h1>Email</h1>
                    <FloatingLabel variant="outlined" label="Label" />
                </Row>
                <Row>
                    <Button color="blue" pill>
                        Cập Nhật
                    </Button>
                </Row>
            </Card>
        </Container>
    )
}

export default EditUserform 