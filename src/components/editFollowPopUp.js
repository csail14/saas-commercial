import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import moment from 'moment'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {editFollow, getAllFollow, deleteFollow} from '../api/followApi';
import {loadFollow} from '../actions/follow/followActions';

const EditFollowPopUp = (props)=>{
	const [date, setDate] = useState(moment(props.selectFollow.callDateTime));
	const [type, setType] = useState(props.selectFollow.type);
	const [description, setDescription] = useState(props.selectFollow.description);
	
	
	
	const onSubmitForm = ()=>{
	    let formDate = moment(date).format('yyyy-M-D')+' '+moment(date).format('HH:mm:ss')
        let data = {
            prospect_id: props.prospects_id,
            follow_id:props.selectFollow.id,
            user_id: props.user.infos.id,
            callDateTime: formDate,
            description: description,
            type: type
        }
	    
	    
	    console.log(data);
	    
	    editFollow(data)
	        .then((res)=>{
	            console.log('response save',res);
	            getAllFollow(props.user.infos.id)
	                .then((response)=>{
	                   props.loadFollow(response.follow)
	                   props.onClickclose();
	                })
	            
	        })
	 }
	
	
	
	return (
		<div className="popup">
			<div className="close"
			 style={{cursor: "pointer", color:'red'}}
				onClick={(e)=>{
					props.onClickclose();
					
				}}
			>X</div>
			<h2>suivi</h2>
			<form 
			className="form-add-follow" 
				onSubmit={(e)=>{
					e.preventDefault();
					onSubmitForm();
				}}
				style={{marginBottom: '30px'}}
			>
				<Datetime 
					value={date}
					onChange={(value)=>{
						console.log(value)
						setDate(value);
					}}
				/>
				<select
					value={type}
					onChange={(e)=>{
						setType(e.currentTarget.value);
					}}
				>
					<option>call</option>
					<option>rdv</option>
				</select>
				<textarea
					type="text"
					placeholder="description"
					value={description}
					onChange={(e)=>{
						setDescription(e.currentTarget.value);
					}}
				>
				</textarea>
				<input  style={{cursor: "pointer"}} type="submit" value="Modifer"/>
			</form>
			<div className="detail-prospects-buttons">
					<div
						className="delete"
						style={{cursor: "pointer"}}
						onClick={(e)=>{
							if (window.confirm('Attention, vous êtes sur le point de supprimer un suivi, êtes vous sûr de continuer ?')) {
							  deleteFollow(props.user.infos.id,props.selectFollow.id)
							    .then((res)=>{
							        if(res.status === 200) {
							            getAllFollow(props.user.infos.id)
							                .then((response)=>{
							                    props.loadFollow(response.follow);
							                    props.onClickclose();
							                })
							            
							        }    
							    })
    
							} else {
							  
							}

						}}
					>
						Supprimer
					</div>
					<div
						className="update"
						style={{cursor: "pointer"}}
						onClick={()=>{
							props.onClickclose();
						}}
					>
						Retour
					</div>
				</div>
		</div>
	)
}


const mapDispatchToProps = {
	loadFollow
}

const mapStateToProps = (store)=>{
	return {
		user: store.user,
		contact: store.contact,
        follow:store.follow
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFollowPopUp);