import React, { Component } from 'react';
//import { connect } from "react-redux";
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'


export class SignUp extends Component {
  static displayName = SignUp.name;

  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
    validUsername: false,
    errorArea: "",
  };

  handleInputChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleRegister = () => {
    const existingUsernames = this.getUsernames();

    if (!existingUsernames.includes(this.state.username)) {
      this.setState({
        validUsername: true
      });

      const first = this.state.firstName.toLowerCase();
      const last = this.state.lastName.toLowerCase();

      if (first === "laura" && last === "admin") {
        this.setState({
          role: "admin"
        });
      } else {
        this.setState({
          role: "user"
        })
      }

      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password,
        role: this.state.role
      };

      this.postUser(newUser);
    } else {
      console.log("inside handleRegister, else case")
      this.setState({
        errorArea: "This username is already chosen."
      });

    }
    console.log("done with registering");
  }

  getUsernames = () => {
    // make api call here
    return ["animalLover", "hikingLover"];
  }

  postUser = (newUser) => {
    //make api call here
    console.log(newUser.toString());
  }
  

  displayForm = () => {
    return (
    <>
        <p>Inside sign up page</p>
        {this.state.errorArea}
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
                      name="username" />
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
    )
  }

  render() {
    console.log("Inside render of SignUp")
    return (
      <>
        {!this.state.validUsername && this.displayForm()}
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

