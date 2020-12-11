import axios from 'axios';
import {config} from '../config'

export const addNewUser = (data) =>{
    return axios.post(config.base_url+'/api/v1/user/add',data)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err
            })
}

export const editUser = (data,id)=> {
    return axios.put(config.base_url+'/api/v1/edit/user/'+id,data)
            .then((res)=> {
                return res.data;
            })
            .catch((err) => {
                return err;
            })
}

export const loginUser = (data)=>{
    return axios.post(config.base_url+"/api/v1/user/login", data)
            .then((res)=>{
                return res.data
            })
            .catch((err)=>{
                return err;
            })
}

export const forgotPassword = (data)=>{
    return axios.post(config.base_url+'/api/v1/user/forgot', data)
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}