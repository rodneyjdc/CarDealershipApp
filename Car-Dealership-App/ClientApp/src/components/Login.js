import React from "react";
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { changeADMINSTATUS, changeLOGINSTATUS, changeUSERNAME, changeFIRSTNAME, changeCURRENTUSER } from "../redux/store"
import { Redirect } from "react-router";
import { Link } from 'react-router-dom'

export class Login extends React.Component {
    state = {
        userName: "",
        password: "",
        firstName: "",
        user: undefined,
        existingUsers: []
    };

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        fetch("http://localhost:5000/mongo/api/users", {
            method: "GET",
            headers: {
                Accept: "application/json",
                // "Content-Type": "application/json",
                // "Access-Control-Allow-Origin": "*",
            },
        })
            .then((result) => result.json())
            .then((result) => {
                this.setState({
                    existingUsers: result,
                });
            })
            .catch((e) => console.log(e));
    }

    updateInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleLogin = () => {
        // console.log(this.props);
        // console.log("in handleLogin");
        this.getUsers();
        console.log("this.state.existingUsers", this.state.existingUsers);
        this.state.existingUsers.forEach(element => {
            if (this.state.userName === element.username && this.state.password === element.password) {

                console.log("inside for each, element.role", element.role);
                console.log("firstName: ", element.firstName)

                this.setState({firstName: element.firstName});
                this.setState({user: element}, () => this.setStoreProps())

                if (element.role === "admin") {
                    this.props.dispatch(changeADMINSTATUS(true));
                    this.props.dispatch(changeLOGINSTATUS(true));
                } else {
                    this.props.dispatch(changeLOGINSTATUS(true));
                }
            }
        });

      
        // this.setState({
        //     userName: "",
        //     password: ""
        // });
    }

    setStoreProps = () => {
        // this.props.dispatch(changeUSERNAME(this.state.username));
        // console.log("this.state.firstName: ", this.state.firstName)

        // this.props.dispatch(changeFIRSTNAME(this.state.firstName));
        
        console.log("this.state.user", this.state.user)
        this.props.dispatch(changeCURRENTUSER(this.state.user));
    }

    handleSignUp = () => {
        console.log("inside handleSignUp")
        return (
            <>
                <Redirect
                    to={{
                        pathname: "/signUp"
                    }}
                />
            </>
        );
    }

    render() {
        // console.log(this.props);
        // console.log("this.props.username", this.props.username);
        return this.props.loggedIn ?
            (
                <>
                    <Redirect
                        to={{
                            pathname: "/inventory",
                            // state: {
                            //     name: this.state.firstName,
                            //     user: this.state.user
                            // }
                        }}
                    />
                </>
            ) : (
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
                                    <Card.Footer>
                                        <Button onClick={() => this.handleLogin()}>Log In</Button>
                                        <Link 
                                            class="btn btn-outline-secondary btn-md px-3"
                                            to={{
                                                pathname: '/signUp',
                                        }}>Sign Up</Link>

                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>


                    </Container>
                </div>
            )
    }
}
//export default Login;

function mapStoreToProps(store) {

    console.log(store);
    return {
        username: store.username,
        firstName: store.firstName,
        isAdmin: store.isAdmin,
        loggedIn: store.loggedIn,
    };
}

///const mapDispatchToProps = { changeUSERNAME };

/* const mapDispatchToProps = dispatch => {
    console.log(dispatch)
  return {
    changeUSERNAME: userName => dispatch(changeUSERNAME(userName))
  }} */

export default connect(mapStoreToProps)(Login);