import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


const Header = (props) =>{
    
        return(
            <header>
                <nav>
                    {!props.user.isLogged && <div className='liste1'>
                        <Link className='register unlogged'to='/register'>S'enregister</Link>
                        <Link className='login unlogged' to='/login'>Se connecter</Link>
                        
                    </div>}
                    {props.user.isLogged && <div className='liste1'>
                        <Link className='register'to='/home'>Acceuil</Link>
                        <Link className='login' to='/agenda'>Agenda</Link>
                        <Link className='register' to='/dashboard'>Dashboard</Link>
                        <Link className='login' to='/logout'>Se deconnecter</Link>
                    </div>}
                    
                </nav>
            </header>
        )


}
const mapDispatchToProps = {
 
}

const mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Header);