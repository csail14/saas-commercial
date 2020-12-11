import React from 'react';
import {Redirect} from 'react-router-dom';
import {config} from '../config';
import axios from 'axios';
import {connect} from 'react-redux';
import {loadUserInfo} from '../actions/user/userActions';
import {loadProspect} from '../actions/prospect/prospectActions';
import {loadRdv} from '../actions/rdv/rdvActions';
import {getAllRdv} from '../api/rdvApi';
import {loadFollow} from '../actions/follow/followActions'
import {getAllProspect} from '../api/prospectApi';
import {getAllFollow} from '../api/followApi';

export default function(ChildComponent, withAuth = false) {
    
    class RequireAuth extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                redirect: false
            }
        }
        
        componentDidMount = async () => {
            const token = window.localStorage.getItem('user-token')
            if(token === null && withAuth) {
                this.setState({redirect: true});
            } else {
                if(this.props.user.isLogged === false) {
                    axios.get(config.base_url+'/api/v1/checkToken', {headers: {'x-access-token': token}})
                    .then((response)=>{
                        if(response.data.status !== 200) {
                            if(withAuth === true) {
                                this.setState({redirect: true});
                            }
                        } else {
                            console.log('connecté');
                            this.props.loadUserInfo(response.data.user);
                            if(this.props.rdv.items.length===0){
                                getAllRdv(response.data.user.id)
                                .then(
                                    (res)=>{
                                        this.props.loadRdv(res.result)
                                    }
                                )
                                .catch((err)=>{console.log(err)})
                            }
                            if(this.props.contact.items.length===0){
                                getAllProspect(response.data.user.id)
                                .then(
                                    (res)=>{
                                        if(res.status===200){
                                            this.props.loadProspect(res.result)
                                        }
                                    }
                                )
                                .catch((err)=>{console.log(err)})
                            }
                         if(this.props.follow.items.length===0){
                                 getAllFollow(response.data.user.id)
                                 .then(
                                     (res)=>{
                                         if (res.status===200){
                                            this.props.loadFollow(res.follow)
                                         }
                                     }
                                 )
                                 .catch((err)=>{console.log(err)})
                             }
                        }
                        
                    })
                }
            }
            
        }
        
        render() {
            if(this.state.redirect) {
                return <Redirect to="/login" />
            }
            return (<ChildComponent {...this.props} />)
        }
        
    }
    
    const mapDispatchToProps = {
        loadUserInfo,
        loadRdv,
        loadProspect,
        loadFollow
    }
    
    const mapStateToProps = (store)=>{
        return {
            user: store.user,
            rdv: store.rdv,
            contact: store.contact,
            follow:store.follow
        }
    }
    
    
    return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
}