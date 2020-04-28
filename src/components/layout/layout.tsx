
import React, { Component } from "react";
import "./layout.css";
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import { Home } from "../home/home";
import Vacations from "../vacations/vacations";
import { AddVacation } from "../add-vacation/add-vacation";
import UpdateVacation from "../update-vacation/update-vacation";
import { Users } from "../users/users";
import { Register } from "../register/register";
import { Details } from "../details/details";
import { Login } from "../login/login";
//------------------------------------------------------------------------------

export class Layout extends Component {
    public render(): JSX.Element {
        return (
            <div className="layout">
                <BrowserRouter>
                    <NavLink to="/home" className="navlinkcss" exact>Home</NavLink>
                    <span>  |  </span>
                    <NavLink to="/vacations" exact>Vacations</NavLink>
                    <span>  |  </span>
                    <NavLink to="/users" exact>Users</NavLink>


                    <header>
                        <h1 className="headline">Vacations WebSite</h1>
                    </header>
                    <hr />
                    <main>
                        <Switch>
                            <Route path="/home" component={Home} exact />
                            <Route path="/vacations" component={Vacations} exact />
                            <Route path="/add-vacation" component={AddVacation} exact />
                            <Route path="/vacations/:vacationID" component={Details} exact />
                            <Route path="/update-vacation/:vacationID" component={UpdateVacation} exact />
                            <Route path="/users" component={Users} exact />
                            <Route path="/register" component={Register} exact />
                            <Route path="/login" component={Login} exact />
                            {/* <Redirect from="/" to="/home" exact />
                    <Route component={PageNotFound} /> */}
                        </Switch>
                    </main>
                </BrowserRouter>
            </div>
        );
    }
}