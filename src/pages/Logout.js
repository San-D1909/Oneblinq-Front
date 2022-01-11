import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Logout extends Component {
    static displayName = Logout.name;

    render() {

        if (localStorage.getItem("token")) {
            localStorage.clear()

            return (
                <Redirect to="/login" />
            )
        }
     }
}

