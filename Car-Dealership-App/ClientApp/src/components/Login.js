import React from "react";
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Card } from "react-bootstrap";

export class Login extends React.Component {
    state = {
        userName: "",
        password: "",
    };

    updateInput = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        });
        console.log('Name: ',event.target.name);
        console.log('Value: ',event.target.value);
        console.log('State: ',this.state);
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
                                        <Form.Control type="input" placeholder="username" 
                                        onChange={e => this.updateInput(e)}
                                    //    value={this.state.input} 
                                        name="userName" />
                                        <br></br>
                                        <Form.Control type="password" placeholder="password"
                                         onChange={e => this.updateInput(e)}
                                        //  value={this.state.input}
                                         name="password" />
                                    </Form>
                                </Card.Body>
                                <Card.Footer><Button onClick={this.handleLogin}>Log In</Button></Card.Footer>
                            </Card>
                        </Col>
                    </Row>


                </Container>
            </div>
        )
    }
}
export default Login;