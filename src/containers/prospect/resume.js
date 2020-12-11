import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Resume = (props)=> {

    return(
        <div className='contact'>
            <h2><Link to={'details/'+props.id}>{props.firstName} {props.lastName}<p>{props.company}</p></Link></h2>
            

        </div>
    )

}

export default Resume

