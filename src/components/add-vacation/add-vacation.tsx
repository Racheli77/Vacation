import React, { Component, ChangeEvent } from "react";

import "./add-vacation.css";
import { VacationModel } from "../../models/vacations";
// import { Vacations } from "../vacations/vacations";
// import { NavLink } from "react-router-dom";
import axios from "axios";

//-------------------------------------------------------------------------------------

interface AddVacationState {
    vacation : VacationModel,
    preview: string;
}
//--------------------------------------------------------------------------------------
export class AddVacation extends Component <any , AddVacationState> {

    private fileInput: HTMLInputElement;

    public constructor(props: any) {
        super(props);
        this.state = {
            vacation: new VacationModel(),
            preview: ""
        };
    }
//----------------------------------------------------------------------------------------
    public componentDidMount(): void {
        // fetch("http://localhost:3000/api/add-vacation")
        //     .then(response => response.json())
        //     .then(vacation => {
        //         this.setState({ vacation })
        //     })
        //     .catch(err => alert(err.message));
    }
//-----------------------------------------------------------------------------------------
    private setVacationID = (args: ChangeEvent<HTMLSelectElement>) => {
        const vacationID = +args.target.value;
        const vacation = { ...this.state.vacation };
        vacation.vacationID = vacationID;
        this.setState({ vacation });
    };
//------------------------------------------------------------------------------------------
    private setDescription=(args:ChangeEvent<HTMLInputElement>)=>{//args=input event arguments
        const description = args.target.value;
        const vacation = { ...this.state.vacation }; // Duplicate
        vacation.description = description;
        this.setState({ vacation });
    };
//-------------------------------------------------------------------------------------------
     private setDestionation = (args: ChangeEvent<HTMLInputElement>) => { 
        const destionation = args.target.value;
        const vacation = { ...this.state.vacation }; // Duplicate
        vacation.destination = destionation;
        this.setState({ vacation });
    };
//-------------------------------------------------------------------------------------------
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
//-------------------------------------------------------------------------------------------
    private setStartDate = (args: ChangeEvent<HTMLInputElement>) => { 
        const startDate = args.target.value;
        const vacation = { ...this.state.vacation }; // Duplicate
        vacation.startDate = startDate;
        this.setState({ vacation });
    };
    
//-------------------------------------------------------------------------------------------
    private setEndDate = (args: ChangeEvent<HTMLInputElement>) => { 
        const endDate = args.target.value;
        const vacation = { ...this.state.vacation }; // Duplicate
        vacation.endDate = endDate;
        this.setState({ vacation });
    };
//-------------------------------------------------------------------------------------------
    private setPrice = (args: ChangeEvent<HTMLInputElement>) => {
        const price = +args.target.value;
        const vacation = { ...this.state.vacation };
        vacation.price = price;
        this.setState({ vacation });
    };
//------------------------------------------------------------------------------------------

//==============================================================================================
//OLD
//     private addVacation = () => {
//         const options = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//         body: JSON.stringify(this.state.vacation)
//     };
//     fetch("http://localhost:3000/api/add-vacation", options)
//         .then(response => response.json())
//         .then(vacation => alert("Vacation has been added. ID: " + vacation.vacationID))
//         .catch(err => alert(err.message));
// };

//===========================================================================================
  private addVacation = async () => {
        const myFormData = new FormData();
        myFormData.append("ppp", this.state.vacation.description);
        myFormData.append("description", this.state.vacation.description);
        myFormData.append("destination", this.state.vacation.destination); 
        myFormData.append("picFileName", this.state.vacation.picFileName, this.state.vacation.picFileName.name);
        myFormData.append("startDate", this.state.vacation.startDate.toString());// Can't send number.
        myFormData.append("endDate", this.state.vacation.endDate.toString());
        myFormData.append("price", this.state.vacation.price.toString());

        const response = await axios.post<VacationModel>("http://localhost:3000/api/add-vacation", myFormData);
        const vacation = response.data;
        console.log('vacationvacationvacation', {vacation});
        //this.props.history.push("/vacation");

        alert("Vacation has been added. ID: " + vacation.vacationID);
        
        this.setState({ vacation, preview: "" });
  }
//-------------------------------------------------------------------------------------------
    public render(): JSX.Element {
        return (
            <div className="add-vacation">
                <h2>Add new vacation</h2>
            <form>
                
                <input type="text" placeholder="Description..."
                        onChange={this.setDescription} value={this.state.vacation.description||""} />
                 <br/>
                <input type="text" placeholder="Destionation..."
                        onChange={this.setDestionation} value={this.state.vacation.destination||""} />
                <br/>

                {/* OLD - <input type="text" placeholder="Vacation Image..."  
                        onChange={this.setPicFileName} value={this.state.vacation.picFileName||""} />
                <br/> */}

                <input type="file" onChange={this.setPicFileName} accept="image/*" ref={fi => this.fileInput = fi} />
                <button type="button" onClick={() => this.fileInput.click()}>Select Product Image</button>
                <br /><br />

                <img src={this.state.preview} />
                <br /><br />

                <input type="date" placeholder="Start Date..."  
                        onChange={this.setStartDate} value={this.state.vacation.startDate||""} />
                <br/>
                <input type="date" placeholder="End Date..."  
                        onChange={this.setEndDate} value={this.state.vacation.endDate||""} />
                <br/>
                  <input type="number" placeholder="Vacation Prica..."  
                        onChange={this.setPrice} value={this.state.vacation.price||""} />
                <br/>

                <button type="button" onClick={this.addVacation}>Add Vacation</button> 

            </form>
            </div>
        );
    }
//------------------------------------------------------------------------------------------
}
export default AddVacation;


               