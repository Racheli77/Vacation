import React, { Component } from "react";
import "./landing-page.css";
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import { Login } from "../login/login";
import { Register } from "../register/register";
import  Vacations from "../vacations/vacations";
import { Users } from "../users/users";

//----------------------------------------------------------------------------------

export class LandingPage extends Component {
    public render(): JSX.Element {
        return (
            <div className="landing-page">
                <BrowserRouter>
               <NavLink to="/login" exact>Login</NavLink>
                <span> | </span>
                {/* <NavLink to="/register" exact>Register</NavLink>
                <hr /> */}

                {/* <span> / </span>
                <NavLink to="/users" exact>All Users</NavLink>
                <span>  </span> */}

           
              <hr />
              <header>
                <h1>welcome to vacation website (LandingPage)</h1>
            </header>
            <main>
                <Switch>
                    {/* <Route path="/login" component={Login} exact />
                    <Route path="/register" component={Register} exact />
                    <Route path="/users" component={Users} exact /> */}
                    {/* <Route path="/salaries-per-emp/:id" component={SalariesPerEmp} exact /> */}
                    {/* <Route path="/add-vacation" component={AddVacation} exact /> */}
                </Switch>
            </main>
                </BrowserRouter>
            </div>
        );
    }
//---------------------------------------------------------------------------------------
}