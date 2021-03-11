import React from "react";
import { Card, Container, Row } from 'react-bootstrap'

export class UserProfile extends React.Component {
    state = {
        name: "",
        carsList: []
    };

    componentDidMount() {
        this.setState({
            name: this.props.location.state.ownerName,
            carsList: this.props.location.state.carsList,
        })
    }

    getUserCars = (ownerName) => {
        console.log("inside getUsersCars");
        console.log(ownerName);
        
        const result = this.state.carsList.filter((car) => {
            console.log("inside filter func");
            console.log("car owner: ", car.owner);
            return (car.owner === ownerName);
        })
        console.log("result: ", result);
        return result;
    }

    displayCars = (ownerName) => {
        const result = this.getUserCars(ownerName).map((car, i) => {
            console.log("inside map func");
            return (
                <div key={i}>
                    <Container width="100vh">
                        <Card style={{ width: '30vw' }}>
                            <Card.Body>
                                <Card.Title>Car: {i + 1}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Owner: {car.owner}
                                </Card.Subtitle>
                                <Card.Text>
                                    <Container>
                                        <Row>Make: {car.make}</Row>
                                        <Row>Model: {car.model}</Row>
                                        <Row>Year: {car.year}</Row>
                                        <Row>Color: {car.color}</Row>
                                    </Container>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            );
        });
        return result;
    }


    render() {

        return (
            <>
                <h1>Welcome {this.state.name}!</h1>
                <br></br>
                <br></br>
                {this.displayCars(this.state.name)}
            </>
        );
    }
}

export default UserProfile;