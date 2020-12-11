import {LOAD_RDV_INFO} from './action-type';

export const loadRdv = (rdv)=>{
    return function(dispatch) {
        dispatch({
            type: LOAD_RDV_INFO,
            payload: rdv
        })
    }
}