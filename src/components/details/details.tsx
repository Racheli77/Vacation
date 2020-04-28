import React, { Component } from "react";
import "./details.css";
import { VacationModel } from "../../models/vacations";
import  Vacations from "../vacations/vacations";
import { NavLink } from "react-router-dom";
//-----------------------------------------------------------------------------
interface DetailsState {
    vacation: VacationModel
}
//--------------------------------------------------------------------------------
export class Details extends Component <any,DetailsState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            vacation:null
        };
    }
//------------------------------------------------------------------------------------------
        public componentDidMount(): void {
            // Get vacationID from the route: 
            // this.props.match.params = The route parameters, 
            //this.props.match.params.vacationID = The vacationID route parameter.
            const vacationID = this.props.match.params.vacationID;
            fetch("http://localhost:3000/vacations/" + vacationID)
                .then(response => response.json()) 
                .then(vacation => this.setState({ vacation }))
                .catch(err => alert(err.message));
        }
//-------------------------------------------------------------------------------------------
    public render(): JSX.Element {
        return (
            <div className="details">
                Details page
            <br /><br /> 
                <a href="javascript:void" onClick={this.deleteVacation}>Delete</a>

                {/* <a href="onClick={this.deleteVacation">Delete</a> */}
                {/* // "javascript:void" onClick={this.deleteVacation} */}


                {this.state.vacation &&
                    <React.Fragment> {/* One Fragment to render its content for the conditional rendering */}
                        <p>Description: {this.state.vacation.description}</p>
                        <p>Destination: {this.state.vacation.destination}</p>
                        <p>PicFileName: {this.state.vacation.picFileName}</p>
                        <p>StartDate: {this.state.vacation.startDate}</p>
                        <p>EndDate: {this.state.vacation.endDate}</p>
                        <p>Price: {this.state.vacation.price}</p>

                        {/* <img src={`/assets/images/products/${this.state.vacation.vacationID}.jpg`} />
                        <br /><br /> */}

                        {/* <NavLink to="/vacations" exact>Back to List</NavLink>
                        <span> | </span> */}
                        <a href="javascript:void" onClick={this.deleteVacation}>Delete</a>

                    </React.Fragment>
                }

            </div>
        );
    }
//-------------------------------------------------------------------------------------

private deleteVacation = () => {

    const answer = window.confirm("Are you sure delete vacation to?"  );
   
    if (!answer) {
        return;
    }

    const options = {
        method: "DELETE"
    };

    fetch("http://localhost:3000/vactions/" + this.state.vacation.vacationID, options)
        .then(response => response.json())
        .then(() => {
            alert("Vacation has been successfully deleted! :) ");
            this.props.history.push("/vacations"); // Redirect to "/vacations" route.
        })
        .catch(err => alert(err.message));
};
//----------------------------------------------------------------------------------------
}