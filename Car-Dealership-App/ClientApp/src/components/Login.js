import React from "react";
import { Container, Form, Button,  Row, Col } from 'react-bootstrap'
import { Card } from "react-bootstrap";
import {connect} from "react-redux";
import {changeUSERNAME } from "../redux/store"

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

    /* handleLogin = () =>{
       //this.props.changeUSERNAME(this.state.userName); 
       this.props.dispatch(changeUSERNAME(this.state.userName));


       this.setState({ 
           userName: "",
           password: ""
        });
    } */

    render() {
        console.log(this.props);
        //console.log("this.props.username", this.props.username);
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
                               <Card.Footer><Button onClick={() => this.props.dispatch(changeUSERNAME(this.state.userName))}>Log In</Button></Card.Footer>
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

    console.log(store.username);
  return {
    username: store.username,
  };
}

///const mapDispatchToProps = { changeUSERNAME };

/* const mapDispatchToProps = dispatch => {
    console.log(dispatch)
  return {
    changeUSERNAME: userName => dispatch(changeUSERNAME(userName))
  }} */

export default connect(mapStoreToProps)(Login);