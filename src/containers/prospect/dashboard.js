import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Resume from './resume'

const Dashboard = (props) =>{

    const [contact, setContact] = useState([])
    
    useEffect(() => {
        setContact(props.contact.items)
    },[props])



    return(
        <div>
            {props.user.infos && <h2 className="dashboard-title">Bienvenue {props.user.infos.firstName} !</h2>}
            
            <p style={{margin: "30px"}}></p>
            <p>Voici vos clients/prospects :</p>
            <div className='contact-list'>
                
            {contact && contact.map((prospect)=>{
                return (<Resume className='contact'
                            key={prospect.id} 
                            firstName={prospect.firstName} 
                            lastName={prospect.lastName}
                            company={prospect.company}
                            address={prospect.address}
                            zip={prospect.zip}
                            id={prospect.id}
                            phone={prospect.phone}
                            />)
            })}
            
            </div>
            <p style={{margin: "30px"}}></p>
            <Link className="addProspect" to="/addProspect">Ajoutez un nouveau prospect </Link>
        </div>
    )

}

const mapStateToProps = (store)=>{
	return {
        contact: store.contact,
        user: store.user
	}
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);