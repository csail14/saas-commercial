import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {logoutUser} from '../../actions/user/userActions'

import {Link} from 'react-router-dom';
import {connect} from 'react-redux'


const Logout = (props) => {

    const [redirect,setRedirect] = useState(false)
    const [error, setError] = useState('')
    
    useEffect(() => {
        props.logoutUser()
        window.localStorage.removeItem('user-token');
        setRedirect(true)
    }, [])


    
        return (
            <div className="login-div">
                {redirect && <Redirect to="/login" />}
                
            </div>
        )
}
const mapDispatchToProps = {
    logoutUser
}

const mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);