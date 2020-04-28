import React, { Component, ChangeEvent } from "react";
import "./register.css";
import { UserModel } from "../../models/user";

//--------------------------------------------------------------------------------

interface RegisterState {
    user: UserModel,
}
//--------------------------------------------------------------------------------------
export class Register extends Component<any, RegisterState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            user: new UserModel()
        };
    }
    //----------------------------------------------------------------------------------------

    private setUserID = (args: ChangeEvent<HTMLSelectElement>) => {
        const userID = +args.target.value;
        const user = { ...this.state.user };
        user.userID = userID;
        this.setState({ user });
    };
    //------------------------------------------------------------------------------------------
    private setFirsName = (args: ChangeEvent<HTMLInputElement>) => { // args=input event arguments
        const firsName = args.target.value;
        const user = { ...this.state.user }; // Duplicate
        user.firstName = firsName;
        this.setState({ user });
    };
    //-------------------------------------------------------------------------------------------
    private setLastName = (args: ChangeEvent<HTMLInputElement>) => { // args=input event arguments
        const lastName = args.target.value;
        const user = { ...this.state.user }; // Duplicate
        user.lastName = lastName;
        this.setState({ user });

    };
    //-------------------------------------------------------------------------------------------
    private setUserName = (args: ChangeEvent<HTMLInputElement>) => { // args=input event arguments
        const userName = args.target.value;
        const user = { ...this.state.user }; // Duplicate
        user.userName = userName;
        this.setState({ user });

    };
    //-------------------------------------------------------------------------------------------
    private setUserPasswors = (args: ChangeEvent<HTMLInputElement>) => { // args=input event arguments
        const password = args.target.value;
        const user = { ...this.state.user }; // Duplicate
        user.password = password;
        this.setState({ user });
    };
    //-------------------------------------------------------------------------------------------
    private setIsAdmin = (args: ChangeEvent<HTMLInputElement>) => { // args=input event arguments
        //const isAdmin = args.target.value;
        const isAdmin: boolean = Boolean(args.target.value);
        const user = { ...this.state.user }; // Duplicate
        // user.isAdmin = isAdmin;
        this.setState({ user });
    };
    //-------------------------------------------------------------------------------------------
    private register = () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state.user)
        };
        fetch("http://localhost:3000/api/register", options)
            .then(response => response.json())
            .then(users => {
                alert("User has been added. ID: " + users.userID);
                console.log('users', users);
                
            })
            .catch(err => alert(err.message));
    };
    //-------------------------------------------------------------------------------------------
    public render(): JSX.Element {
        return (
            <div className="register">
                <h2>Fill in your details - and register please</h2>
                <form>
                    <input type="text" placeholder="Firs Name..."
                        onChange={this.setFirsName} value={this.state.user.firstName || ""} />
                    <br />
                    <input type="text" placeholder="Last Name..."
                        onChange={this.setLastName} value={this.state.user.lastName || ""} />
                    <br />
                    <input type="text" placeholder="User Name..."
                        onChange={this.setUserName} value={this.state.user.userName || ""} />
                    <br />
                    <input type="text" placeholder="Password He..."
                        onChange={this.setUserPasswors} value={this.state.user.password || ""} />
                    <br />
                    {/* <input type="boolean" placeholder="IsAdmin.." 
                    onChange={this.setIsAdmin} value={"" + this.state.user.isAdmin||""} /> */}
                    <br />
                    <button type="button" onClick={this.register}>Register</button>
                </form>
            </div>
        );
    }
    //--------------------------------------------------------------------------------
}
//--------------------------------------------------------------------------------
export default Register;
