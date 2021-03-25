import React, { Component } from "react";
//import { connect } from "react-redux";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router";


export class SignUp extends Component {
  static displayName = SignUp.name;

  state = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    role: "none",
    validUsername: false,
    errorArea: "",
    existingUsernames: []
  };

  handleInputChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRegister = () => {
    //const existingUsernames = this.getUsernames();

    console.log("existingUsernames", this.state.existingUsernames);

    // if (this.state.existingUsernames.length === 0) this.postUser();
    if (!this.state.existingUsernames.includes(this.state.username)) {
      let isValid = true;
      let userRole;

      const first = this.state.firstName.toLowerCase();
      const last = this.state.lastName.toLowerCase();

      if (first === "laura" && last === "admin") {
        userRole = "admin";
      } else {
        console.log("else case not laura")
        userRole = "user";
      }
      
      this.setState({
        validUsername: isValid,
        role: userRole
      }, () => this.postUser());

      console.log("in handle register after postUser");
    }
    else {
      console.log("inside handleRegister, else case");
      this.setState({
        errorArea: "This username is already chosen.",
      });
    }


  };

  getUsernames = () => {
    //make api call here
    // fetch("http://localhost:5001/api/usersname", {
    fetch("http://localhost:5000/mongo/api/usernames", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((result) => result.json())
      .then((result) => {
        console.log("before  befor map", result);
        //console.log("before map", result);
        this.setState({
          existingUsernames: result,
        });
      })
      .catch((e) => console.log(e));

  };

  componentDidMount() {
    this.getUsernames();
  }

  postUser = () => {
    console.log("this.state.role", this.state.role);

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
    };

    //make api call here
    fetch("http://localhost:5000/mongo/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newUser),
    })
      .then((result) => result.json())
      .then((result) => console.log("result", result))
      .catch((e) => console.log(e));

    // console.log(newUser.toString());


    console.log("end of postUser");
  };

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
                    <Form.Control
                      type="input"
                      placeholder="first name"
                      onChange={(e) => this.handleInputChange(e)}
                      name="firstName"
                    />
                    <br></br>
                    <Form.Control
                      type="input"
                      placeholder="last name"
                      onChange={(e) => this.handleInputChange(e)}
                      name="lastName"
                    />
                    <br></br>
                    <Form.Control
                      type="input"
                      placeholder="email"
                      onChange={(e) => this.handleInputChange(e)}
                      name="email"
                    />
                    <br></br>
                    <Form.Control
                      type="input"
                      placeholder="username"
                      onChange={(e) => this.handleInputChange(e)}
                      name="username"
                    />
                    <br></br>
                    <Form.Control
                      type="input"
                      placeholder="password"
                      onChange={(e) => this.handleInputChange(e)}
                      name="password"
                    />
                  </Form>
                </Card.Body>
                <Card.Footer>
                  <Button onClick={() => this.handleRegister()}>
                    Register
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  render() {
    console.log("Inside render of SignUp");
    //return <>{!this.state.validUsername && this.displayForm()}</>;
    return this.state.validUsername ?
      (
        <>
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        </>
      ) : (
        this.displayForm()
      )
  }
}

export default SignUp;

// function mapStateToProps(state) {
//   return {
//     username: state.username,
//   };
// }

// export default connect(mapStateToProps)(CustomerCarForm);
