import React, { Component, ChangeEvent } from "react";
import "./login.css";
import axios from 'axios';

export class Login extends Component {

    state = {
        userInfo: null
    }

    onLogin = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/api/login', this.state.userInfo)
    }

    setInfoDetails = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        const userInfoCopy = { ...this.state.userInfo };
        userInfoCopy[key] = e.target.value;
        this.setState({ userInfo: userInfoCopy })
    }

    public render(): JSX.Element {
        return (
            <div className="login">
                <h2>Fill in your details - please</h2>
                <form >

                    <input type="text" placeholder="User Name..." onChange={(e) => this.setInfoDetails(e, 'username')} />
                    <br />
                    <input type="text" placeholder="Password..." onChange={(e) => this.setInfoDetails(e, 'password')} />
                    <br />
                    <button onClick={this.onLogin}>Login</button>
                </form>
            </div>
        );
    }
}