import { Container, Row } from 'react-bootstrap'
import { FloatingLabel, Button, Card } from "flowbite-react";

const ForgotPassword = () => {
    return (
        <Container>
            <Card className="max-w-m">
                <Row>
                    <FloatingLabel variant="outlined" label="Email" />
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
export default ForgotPassword