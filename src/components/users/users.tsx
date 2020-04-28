
import React, { Component } from "react";
import "./users.css";
import { NavLink } from "react-router-dom";
import { UserModel } from "../../models/user";

//-----------------------------------------------------------------------------------
interface UserState {
    users: UserModel[]
}
//-------------------------------------------------------------------------------------
export class Users extends Component <any, UserState>{

    public constructor(props: any) {
        super(props);
        this.state = {
            users: []
        };
    }
//-------------------------------------------------------------------------------------
//http://localhost:3000/api/user/:users
    public componentDidMount(): void {
        fetch("http://localhost:3000/api/users")
            .then(response => response.json())
            .then(users => this.setState({ users }))
            .catch(err => alert(err.message));
    }
//-------------------------------------------------------------------------------------
    public render(): JSX.Element {
        return (
            <div className="users">

                <NavLink to="/register">Add new user</NavLink>
                <span> | </span>
                <NavLink to="/delete">Delete user</NavLink>

                <h4>Here are our {this.state.users.length} Users</h4>
                {this.state.users.map(u =>
                        <div className="u" key={u.userID}>
                            
                            <h3>First Name: {u.firstName}</h3>
                            <h3>Last Name: {u.lastName}</h3>
                            <h3>User Name: {u.userName}</h3>
                            <h3>Password: {u.password}</h3>
                            {/* <h3>Admin 1-Yes/0-No: {u.isAdmin}</h3>  */}

                         </div>
                )}  
            
            </div>
        );
    }
}