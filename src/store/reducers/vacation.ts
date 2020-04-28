
import { ActionType } from '../actions/actionTypes';
import { VacationModel } from '../../models/vacations';

interface AppState {
    vacations: VacationModel[]
}

const initialState: AppState = {
    vacations: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {


        case ActionType.GetAllVacations:
            return {
                ...state,
                vacations: action.payload
            }
        case ActionType.DeleteVacation:
            return {
                ...state,
                vacations: state.vacations.filter(vacation => vacation.vacationID !== action.payload)
            }
        case ActionType.UpdateVacation:
            const requestedIdnex = state.vacations.findIndex(v => v.vacationID.toString() === action.payload.vacationID);
            const copyVacations = [...state.vacations];
            copyVacations[requestedIdnex] = action.payload;
            console.log('copyVacations', copyVacations);
            
            return {
                ...state,
                vacations: copyVacations
            }
        default:
            return state;
    };

}

//---------------------------------------------------------------------------------------------------
export default reducer;