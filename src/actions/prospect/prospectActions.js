import {LOAD_PROSPECT_INFO} from './action-types';

export const loadProspect = (prospects)=>{
    return function(dispatch) {
        dispatch({
            type: LOAD_PROSPECT_INFO,
            payload: prospects
        })
    }
}