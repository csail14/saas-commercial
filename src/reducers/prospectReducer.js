import {LOAD_PROSPECT_INFO} from '../actions/prospect/action-types';

const initialState = {
    items:[]
}

const ProspectReducer = (state = initialState, action)=>{
   
    switch(action.type) {
        case LOAD_PROSPECT_INFO:
            return {items: action.payload}    
        break;
    }
    return state;
}

export default ProspectReducer;