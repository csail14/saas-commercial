import axios from 'axios';
import {config} from '../config';
const token = window.localStorage.getItem('user-token')

export const getAllFollow = (user_id)=> {
    const token = window.localStorage.getItem('user-token')
    return axios.get(config.base_url+'/api/v1/follow/get/all/'+user_id, {headers: {'x-access-token': token}})
            .then((res)=> {
                return res.data;
            })
            .catch((err) => {
                return err;
            })
}

export const getProspectById = (data,user_id)=> {
    return axios.get(config.base_url+'/api/v1/follow/get/'+user_id+'/'+data.follow_id, {headers: {'x-access-token': token}})
            .then((res)=> {
                return res.data;
            })
            .catch((err) => {
                return err;
            })
}



export const addNewFollow = (data) =>{
    return axios.post(config.base_url+'/api/v1/follow/add/'+data.user_id+'/'+data.prospect_id,data, {headers: {'x-access-token': token}})
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err
            })
}

export const deleteFollow = (user_id,follow_id)=> {
    
    return axios.delete(config.base_url+'/api/v1/follow/delete/'+user_id+'/'+follow_id, {headers: {'x-access-token': token}})
            .then((res)=> {
                return res.data;
            })
            .catch((err) => {
                return err;
            })
}
export const editFollow = (data)=> {
    return axios.put(config.base_url+'/api/v1/follow/set/'+data.user_id+'/'+data.follow_id,data, {headers: {'x-access-token': token}})
            .then((res)=> {
                return res.data;
            })
            .catch((err) => {
                return err;
            })
}

