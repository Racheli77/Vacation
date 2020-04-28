
import React, { Component, ChangeEvent } from "react";
import "./update-vacation.css";
import axios from 'axios'
import { VacationModel } from "../../models/vacations";
import { connect } from 'react-redux'
import { ActionType } from "../../store/actions/actionTypes";

interface AddVacationState {
    vacation: VacationModel,
    preview: string;
}

class UpdateVacation extends Component<any, AddVacationState> {

    private fileInput: HTMLInputElement;

    public constructor(props: any) {
        super(props);
        this.state = {
            vacation: new VacationModel(),
            preview: ''
        };
    }

    componentDidMount() {
        this.getVacationById();
    }

    private async getVacationById() {
        const result = await axios.get(`http://localhost:3000/api/vacations/${this.props.match.params.vacationID}`);
        this.setState({ vacation: result.data })
    }

    private getDateFormat(date: string) {
        let newMonth = '';
        const dateObj = new Date(date);
        let month: any = dateObj.getUTCMonth() + 1; //months from 1-12
        if (month.toString().length < 2) {
            newMonth = `0${month}`
        } else {
            newMonth = month
        }
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();

        const newdate = year + "-" + newMonth + "-" + day;
        return newdate || ''

    }

    private setDescription = (args: ChangeEvent<HTMLInputElement>, key: string) => {//args=input event arguments
        const value = args.target.value;
        const vacation = { ...this.state.vacation }; // Duplicate
        vacation[key] = value;
        this.setState({ vacation });
    };

    private setPicFileName = (args: ChangeEvent<HTMLInputElement>) => {
        const picFileName = args.target.files[0];
        const vacation = { ...this.state.vacation }; // Duplicate
        vacation.picFileName = picFileName;
        this.setState({ vacation });

        // Display image on client:
        var reader = new FileReader();
        reader.onload = event => this.setState({ preview: event.target.result.toString() });
        reader.readAsDataURL(picFileName); // Read the image.
    };



    public onUpdateVacation = async () => {
        const myFormData = new FormData();
        myFormData.append("description", this.state.vacation.description);
        myFormData.append("destination", this.state.vacation.destination); 
        myFormData.append("picFileName", this.state.vacation.picFileName, this.state.vacation.picFileName.name);
        myFormData.append("startDate", this.state.vacation.startDate.toString());// Can't send number.
        myFormData.append("endDate", this.state.vacation.endDate.toString());
        myFormData.append("price", this.state.vacation.price.toString());
        await axios.put(`http://localhost:3000/api/vacations/${this.props.match.params.vacationID}`, myFormData);
        this.props.history.push('/vacations');
    }

    public render(): JSX.Element {
        return (
            <div className="add-vacation">
                {console.log('this.state.vacation', this.state.vacation)}
                <h2>UPDATE VACATION</h2>
                <form>

                    <input type="text" placeholder="Description..."
                        onChange={(ev) => this.setDescription(ev, 'description')} value={this.state.vacation.description || ""} />
                    <br />

                    <input type="text" placeholder="Description..."
                        onChange={(ev) => this.setDescription(ev, 'destination')} value={this.state.vacation.destination || ""} />
                    <br />

                    <input type="file" onChange={this.setPicFileName} accept="image/*" ref={fi => this.fileInput = fi} />
                    <button type="button" onClick={() => this.fileInput.click()}>Select Product Image</button>
                    <br /><br />

                    <img src={this.state.preview} />
                    <br /><br />


                    {this.state.vacation && this.state.vacation.startDate ?
                        <input type="date" placeholder="Start Date..."
                            onChange={(ev) => this.setDescription(ev, 'startDate')} value={this.getDateFormat(this.state.vacation.startDate)} />
                        : null}
                    <br />
                    {this.state.vacation && this.state.vacation.endDate ?
                        <input type="date" placeholder="End Date..."
                            onChange={(ev) => this.setDescription(ev, 'endDate')} value={this.getDateFormat(this.state.vacation.endDate)} />
                        : null}
                    <br />
                    <input type="number" placeholder="Vacation Prica..."
                        onChange={(ev) => this.setDescription(ev, 'price')} value={this.state.vacation.price || ""} />
                    <br />

                </form>

                <button onClick={this.onUpdateVacation}>UPDATE</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateVacation: (vacation) => dispatch({ type: ActionType.UpdateVacation, payload: vacation }),
    }
};


//-------------------------------------------------------------------------------------------------

export default connect(null, mapDispatchToProps)(UpdateVacation);