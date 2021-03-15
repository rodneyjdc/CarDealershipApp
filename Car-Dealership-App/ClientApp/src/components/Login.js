import React from "react";
import { Container, Form, Button,  Row, Col } from 'react-bootstrap'
import { Card } from "react-bootstrap";
import {connect} from "react-redux";
import {changeADMINSTATUS, changeLOGINSTATUS, changeUSERNAME } from "../redux/store"
import { Redirect } from "react-router";

class Login extends React.Component {
    state = {
        userName: "",
        password: "",
    };

    updateInput = (event) => {
        

        this.setState({ 
            [event.target.name]: event.target.value
        });
        
              
    };

    handleLogin = () =>{
        console.log(this.props);
       //this.props.changeUSERNAME(this.state.userName); 
       this.props.dispatch(changeUSERNAME(this.state.userName));

       if(this.state.userName === 'Laura' || this.state.userName === 'laura'){
        this.props.dispatch(changeADMINSTATUS(true));
        this.props.dispatch(changeLOGINSTATUS(true));
       } else{
        this.props.dispatch(changeLOGINSTATUS(true));
       }

       this.setState({ 
           userName: "",
           password: ""
        });
    }

    render() {
        console.log(this.props);
        console.log("this.props.username", this.props.username);
        return  this.props.username ? 
        (
            <>
              <Redirect
                to={{
                  pathname: "/inventory"
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
                               <Card.Footer><Button onClick={() => this.handleLogin()}>Log In</Button></Card.Footer>
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
    isAdmin: store.isAdmin,
    isLogin: store.isLogin,
  };
}

///const mapDispatchToProps = { changeUSERNAME };

/* const mapDispatchToProps = dispatch => {
    console.log(dispatch)
  return {
    changeUSERNAME: userName => dispatch(changeUSERNAME(userName))
  }} */

export default connect(mapStoreToProps)(Login);