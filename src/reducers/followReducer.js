import {LOAD_FOLLOW_INFO} from '../actions/follow/action-types';

const initialState = {
    items:[]
}

const FollowReducer = (state = initialState, action)=>{
   
    switch(action.type) {
        case LOAD_FOLLOW_INFO:
            return {items: action.payload}    
        break;
    }
    return state;
}

export default FollowReducer;