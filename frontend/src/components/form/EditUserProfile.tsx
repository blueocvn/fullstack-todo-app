import { Container, Row } from 'react-bootstrap'
import { FloatingLabel, Button, Card } from "flowbite-react";
import axios from "axios";
import  { useEffect, useState} from "react";
const  id  = sessionStorage.getItem("currUser");
const [user, setUser] = useState({});
useEffect(() => {
    axios
      .get("http://localhost:9999/company/" + id)
      .then((res) => setUser(res.data))
      .catch((error) => console.log(error));
  }, [id]);
const EditUserform = () => {
    return (
        <Container>
            <Card className="max-w-m" >
                <Row>
                    <FloatingLabel variant="outlined" label="Họ và tên"/>
                </Row>
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

export default EditUserform 