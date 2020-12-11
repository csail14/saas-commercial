import axios from 'axios';
import {config} from '../config';
const token = window.localStorage.getItem('user-token')

export const getAllRdv = (user_id)=> {
    const token = window.localStorage.getItem('user-token')
    return axios.get(config.base_url+'/api/v1/rdv/get/all/'+user_id, {headers: {'x-access-token': token}})
            .then((res)=> {
                return res.data;
            })
            .catch((err) => {
                return err;
            })
}

export const getRdvById = (data,user_id,rdv_id)=> {
    return axios.get(config.base_url+'/api/v1/rdv/get/'+user_id+'/'+rdv_id, {headers: {'x-access-token': token}})
            .then((res)=> {
                return res.data;
            })
            .catch((err) => {
                return err;
            })
}



export const addNewRdv = (data,user_id) =>{
    return axios.post(config.base_url+'/api/v1/rdv/add/'+user_id,data, {headers: {'x-access-token': token}})
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err
            })
}

export const deleteRdv = (data,user_id,rdv_id)=> {
    return axios.delete(config.base_url+'/api/v1/rdv/delete/'+user_id+'/'+rdv_id,data, {headers: {'x-access-token': token}})
            .then((res)=> {
                return res.data;
            })
            .catch((err) => {
                return err;
            })
}
export const setRdv = (data)=> {
    return axios.put(config.base_url+'/api/v1/rdv/set/'+data.user_id+'/'+data._id,data, {headers: {'x-access-token': token}})
            .then((res)=> {
                return res.data;
            })
            .catch((err) => {
                return err;
            })
}

