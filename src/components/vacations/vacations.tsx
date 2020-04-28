
import React, { Component } from "react";
import "./vacations.css";
import { VacationModel } from "../../models/vacations";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { ActionType } from "../../store/actions/actionTypes";
import axios from 'axios';
import { IoMdCreate } from 'react-icons/io';


//-----------------------------------------------------------------------------------
interface VacationState {
    vacations: VacationModel[]
}
//-------------------------------------------------------------------------------------
class Vacations extends Component<any, VacationState>{

    public constructor(props: any) {
        super(props);
        // this.state = {
        //     vacations: []
        // };
    }
    //-------------------------------------------------------------------------------------
    public componentDidMount() {

        fetch("http://localhost:3000/api/vacations")
            .then(response => response.json())
            .then(vacations => {
                this.props.getAllVacations(vacations);
                // if (vacations) {
                //     this.props.getAllVacations(vacations);
                // } else {
                //     this.props.history.push('/register')
                //     // this.props.history.push('/login')
                // }

            })
            .catch(err => alert(err.message));
    }
    //---------------------------------------------------------------------------------------------

    public async onDeleteVacation(vId: string) {
        const deletedVacation = await axios.delete(`http://localhost:3000/api/vacations/${vId}`);
        if (deletedVacation) {
            this.props.deleteStoreVacation(vId);
        }
    }
    //---------------------------------------------------------------------------------------------
    public goToUpdatePage(vacationID: string) {
        this.props.history.push(`/update-vacation/${vacationID}`)
    }
    //---------------------------------------------------------------------------------------------

    public onFollowVacation() {
        
    }
    //----------------------------------------------------------------------------------------------

    public render(): JSX.Element {
        return (
            <div className="vacations">

                <NavLink to="/add-vacation">Add new vacation</NavLink>
                <span> | </span>
                <NavLink to="/delete">Delete vacation</NavLink>

                <h4>Here are our {this.props.vacations.length} Vacations</h4>
                {this.props.vacations.map(v =>
                    // <NavLink to={"/vacations/" + v.vacationID} key={v.vacationID}>
                    <div className="v" key={v.vacationID}>
                        <div className="flex space-between align-items-center">
                            <h3>Your vacation to: {v.destination}</h3>
                            <button className="btn-cancel" onClick={() => this.onDeleteVacation(v.vacationID)}>X</button> {/*Delete Vacation*/}
                            <div className="edit-btn" onClick={() => this.goToUpdatePage(v.vacationID)}> {/*Update Vacation*/}
                                <IoMdCreate />
                            </div>
                            <div>
                                <button className="btn-cancel" onClick={this.onFollowVacation}>F</button> {/*Follow Vacation*/}
                            </div>
                        </div>
                        {/* <button onClick={() => this.onUpdateVacation(v.vacationID)}>i</button> */}
                        <hr />
                        <h3>proberly for: {v.description}</h3>
                        <h3>picFileName: {v.picFileName}</h3>
                        <img src={'http://localhost:3000/api/uploads/' + v.picFileName} />
                        <h3>startDate: {v.startDate}</h3>
                        <h3>endDate: {v.endDate}</h3>
                        <h3>price: {v.price}</h3>
                    </div>
                    // </NavLink>
                )}
            </div>
        );
    }
    //------------------------------------------------------------------------------------------
}

//-------------------------------------------------------------------------------------------------

const mapStateToProps = (state) => {
    return {
        vacations: state.vacations
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        getAllVacations: (vacations) => dispatch({ type: ActionType.GetAllVacations, payload: vacations }),
        deleteStoreVacation: (vacationID) => dispatch({ type: ActionType.DeleteVacation, payload: vacationID }),
    }
};


//-------------------------------------------------------------------------------------------------

export default connect(mapStateToProps, mapDispatchToProps)(Vacations);