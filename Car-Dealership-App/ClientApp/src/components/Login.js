import React from "react";
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Card } from "react-bootstrap";

export class Login extends React.Component {
    state = {
        userName: "",
        password: "",
    };

    render() {
        return (
            <div>
                <Container>
                    <Row></Row>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>Login Page</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Control type="input" placeholder="username" />
                                        <br></br>
                                        <Form.Control type="password" placeholder="password" />
                                    </Form>
                                </Card.Body>
                                <Card.Footer><Button>Log In</Button></Card.Footer>
                            </Card>
                        </Col>
                    </Row>


                </Container>
            </div>
        )
    }
}
export default Login;