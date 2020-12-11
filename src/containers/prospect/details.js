import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {loadProspect} from '../../actions/prospect/prospectActions';
import {deleteProspect, getAllProspect} from '../../api/prospectApi';
import EditFollowPopUp from '../../components/editFollowPopUp'
import moment from 'moment'
import AddFollowPopUp from '../../components/addFollowPopUp'
import 'moment/locale/fr';
moment.locale('fr');

const DetailProspect = (props)=>{

	const [index, setIndex] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [follow, setFollow] = useState([]);
    const [showAddPopUp, setShowAddPopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    const [selectFollow, setSelectedFollow] = useState({});


    useEffect(()=>{
        console.log('contact',props.contact)
        let id = props.match.params.id;
       
        let goodIndex = props.contact.items.findIndex((prospect)=>{
            return parseInt(prospect.id) === parseInt(id)
        })
        console.log(goodIndex);
        if(goodIndex !== -1) {
            setIndex(goodIndex)
            if(props.follow.items.length > 0) {
                let filterFollows = props.follow.items.filter((el)=>{
                    return el.prospect_id === props.contact.items[goodIndex].id
                })
                console.log("filterFollows",filterFollows)
                
                setFollow(filterFollows);
            }
        }
    }, [props])

	
	return (
	    <div className="detail-prospect">
            <Link style={{cursor: "pointer"}} to="/home">Retour</Link>
            {redirect && <Redirect to="/home" />}
            {index !== null && <div>
                { showAddPopUp && <AddFollowPopUp  
									prospects_id={props.contact.items[index].id}
									onClickclose={(e)=>{
										setShowAddPopUp(false);
									}}
								/>
			}
            { showEditPopUp && <EditFollowPopUp  
									prospects_id={props.contact.items[index].id}
									onClickclose={(e)=>{
										setShowEditPopUp(false);
									}}
									selectFollow={selectFollow}
								/>
			}
                <h2>{props.contact.items[index].firstName} {props.contact.items[index].lastName} <span>({props.contact.items[index].status})</span></h2>
                <div className="detail-prospects-buttons">
                    <div 
                        className="delete"
                        onClick={(e)=>{
                            if (window.confirm('Attention, vous êtes sur le point de supprimer un prospect, êtes vous sur de continuer')) {
                                let data = {
                                    user_id:props.user.infos.id,
                                    prospect_id: props.match.params.id
                                }
                                deleteProspect(data)
                                    .then((res)=>{
                                        if(res.status === 200) {
                                            setRedirect(true);
                                            getAllProspect(props.user.infos.id)
                                                .then((result)=>{
                                                    props.loadProspect(result.result);
                                                })
                                        }    
                                    })
                                
                            } else {
                                
                            }
                        }}
                    >
                        <Link style={{cursor: "pointer"}}>Supprimer</Link>
                    </div>
                    <div className="update">
                        <Link style={{cursor: "pointer"}} to={'/edit/'+props.match.params.id}>Modifier</Link>
                    </div>
                </div>
                <p>{props.contact.items[index].company} : {props.contact.items[index].address} {props.contact.items[index].zip} {props.contact.items[index].city}</p>
				<p>Tel : {props.contact.items[index].phone}</p>
				<p>Email : {props.contact.items[index].email}</p>
				<p>Description : {props.contact.items[index].description}</p>
                <div style={{cursor: "pointer"}}
					className="new"
					onClick={()=>{
						setShowAddPopUp(true);
					} }
				>
					Ajoutez un suivi
				</div>
                { follow.length > 0 && <ul className="rdv-list">
				   { follow.map((el)=>{
				       return(
                        <li 
                        key={el.id}
                        onClick={()=>{
                            setSelectedFollow(el)
                            setShowEditPopUp(true);
                        }}
                      >
                        <Link style={{cursor: "pointer"}}>{el.type} ({moment(el.callDateTime).format('L')} {moment(el.callDateTime).format('LTS')})</Link>
                        </li>
                       )}) }
				    
				</ul>}
            </div>}
	    </div>
	)
	   
}

const mapDispatchToProps = {
	loadProspect
}

const mapStateToProps = (store)=>{
	return {
		user: store.user,
        contact: store.contact,
        follow: store.follow
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProspect);