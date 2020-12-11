import {LOAD_RDV_INFO} from '../actions/rdv/action-type';

const initialState = {
    items:[]
}

const RdvReducer = (state = initialState, action)=>{
    
    switch(action.type) {
        case LOAD_RDV_INFO:
            return {items: action.payload}    
        break;
    }
    return state;
}

export default RdvReducer;