import {combineReducers} from "redux";
import UserReducer from "./userReducer";
import ProspectReducer from './prospectReducer'
import RdvReducer from "./rdvReducer";
import FollowReducer from './followReducer';


const rootReducer = combineReducers({
    user: UserReducer,
    rdv: RdvReducer,
    contact: ProspectReducer, 
    follow:FollowReducer
})

export default rootReducer;