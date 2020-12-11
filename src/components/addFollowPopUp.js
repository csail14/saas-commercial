import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import moment from 'moment'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {addNewFollow, getAllFollow} from '../api/followApi';
import {loadFollow} from '../actions/follow/followActions';

const AddFollowPopUp = (props)=>{
	const [date, setDate] = useState(moment());
	const [type, setType] = useState("call");
	const [description, setDescription] = useState("");
	
	const onSubmitForm = ()=>{
	    let formDate = moment(date).format('yyyy-M-D')+' '+moment(date).format('HH:mm:ss')
        let data = {
            prospect_id: props.prospects_id,
            user_id: props.user.infos.id,
            callDateTime: formDate,
            description: description,
            type: type
        }
	    
	    
	    console.log(data);
	    
	    addNewFollow(data)
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
			<h2>Ajouter un suivi</h2>
			<form className="form-add-follow" 
				onSubmit={(e)=>{
					e.preventDefault();
					onSubmitForm();
				}}
			>
				<Datetime className="date"
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
				<input  style={{cursor: "pointer"}} type="submit" value="Ajouter"/>
			</form>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddFollowPopUp);