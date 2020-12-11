import {LOAD_FOLLOW_INFO} from './action-types';

export const loadFollow = (follow)=>{
    return function(dispatch) {
        dispatch({
            type: LOAD_FOLLOW_INFO,
            payload: follow
        })
    }
}