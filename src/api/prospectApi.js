import axios from 'axios';
import {config} from '../config';
const token = window.localStorage.getItem('user-token')


export const getAllProspect = (user_id)=> {
    const token = window.localStorage.getItem('user-token')
    return axios.get(config.base_url+'/api/v1/prospect/get/all/'+user_id, {headers: {'x-access-token': token}})
            .then((res)=> {
                return res.data;
            })
            .catch((err) => {
                return err;
            })
}

export const getProspectById = (data)=> {
    return axios.get(config.base_url+'/api/v1/prospect/get/'+data.user_id+'/'+data.prospect_id, {headers: {'x-access-token': token}})
            .then((res)=> {
                return res.data;
            })
            .catch((err) => {
                return err;
            })
}



export const addNewProspect = (data) =>{
    return axios.post(config.base_url+'/api/v1/prospect/add/'+data.user_id,data, {headers: {'x-access-token': token}})
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err
            })
}

export const deleteProspect = (data)=> {
    console.log('token',token)
    return axios.delete(config.base_url+'/api/v1/prospect/delete/'+data.user_id+'/'+data.prospect_id, {headers: {'x-access-token': token}})
            .then((res)=> {
                return res.data;
            })
            .catch((err) => {
                return err;
            })
}
export const editProspect = (data)=> {
    return axios.put(config.base_url+'/api/v1/prospect/set/'+data.user_id+'/'+data.prospect_id,data, {headers: {'x-access-token': token}})
            .then((res)=> {
                return res.data;
            })
            .catch((err) => {
                return err;
            })
}

