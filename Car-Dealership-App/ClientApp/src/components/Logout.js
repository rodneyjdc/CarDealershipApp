import React from "react";
import { connect } from "react-redux";
import { changeADMINSTATUS, changeLOGINSTATUS, changeUSERNAME, changeFIRSTNAME, changeCURRENTUSER } from "../redux/store"
import { Redirect } from "react-router";

export class Logout extends React.Component {

    resetStoreProps = () => {
        this.props.dispatch(changeUSERNAME(undefined));
        this.props.dispatch(changeFIRSTNAME(undefined));
        this.props.dispatch(changeCURRENTUSER(undefined));
        this.props.dispatch(changeLOGINSTATUS(false));
        this.props.dispatch(changeADMINSTATUS(false));
    };

    render() {
        console.log("store props before reset", this.props);
        this.resetStoreProps();
        console.log("store props after reset", this.props);

        return (
            <Redirect
                to={{
                    pathname: "/",
                }}
            />
        )
    }
}

function mapStoreToProps(store) {
    return {
        username: store.username,
        firstName: store.firstName,
        isAdmin: store.isAdmin,
        loggedIn: store.loggedIn,
    };
}

export default connect(mapStoreToProps)(Logout);