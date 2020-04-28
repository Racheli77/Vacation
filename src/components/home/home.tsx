import React, { Component } from "react";
import "./home.css";

export class Home extends Component {
    public render(): JSX.Element {
        return (
            <div className="home">
                Home page
                <img src="http://localhost3000/server/images/india.jpg"/>
                <span> | </span>

            </div>
        );
    }
}