import React, { Component } from 'react';
//import { connect } from "react-redux";
import { Container, Card, Form, Button,  Row, Col } from 'react-bootstrap'


export class SignUp extends Component {
  static displayName = SignUp.name;

  state = {
    firstName: "",
    lastName: "",
    userName: "",
    password: ""
  };

  handleInputChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  render() {
    console.log("Inside render of SignUp");
    return (
      <>
        <p>Inside sign up page</p>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Header>Sign Up Page</Card.Header>
                <Card.Body>
                  <Form>
                  <Form.Control type="input" placeholder="first name"
                      onChange={e => this.handleInputChange(e)}
                      name="firstName" />
                    <br></br>
                    <Form.Control type="input" placeholder="last name"
                      onChange={e => this.handleInputChange(e)}
                      name="lastName" />
                    <br></br>
                    <Form.Control type="input" placeholder="username"
                      onChange={e => this.handleInputChange(e)}
                      name="userName" />
                    <br></br>
                    <Form.Control type="input" placeholder="password"
                      onChange={e => this.handleInputChange(e)}
                      name="password" />
                  </Form>
                </Card.Body>
                <Card.Footer>
                  <Button onClick={() => this.handleRegister()}>Register</Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </>


    );
  }
}

export default SignUp;

// function mapStateToProps(state) {
//   return {
//     username: state.username,
//   };
// }

// export default connect(mapStateToProps)(CustomerCarForm); 

