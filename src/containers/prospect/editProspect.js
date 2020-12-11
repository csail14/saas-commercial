import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {editProspect, getAllProspect} from '../../api/prospectApi';
import {loadProspect} from '../../actions/prospect/prospectActions'


const EditProspect = (props)=>{

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [company, setCompany] = useState("");
	const [address, setAddress] = useState("");
	const [zip, setZip] = useState("");
	const [city, setCity] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [status, setStatus] = useState("prospect");
	const [description, setDescription] = useState("");
	const [redirect, setRedirect] = useState(false);
	
	useEffect(()=>{
		let id = props.match.params.id;
		let index = props.contact.items.findIndex((prospect)=>{
			return prospect.id == id;
		})
		if(index !== -1) {
			setFirstName(props.contact.items[index].firstName);
			setLastName(props.contact.items[index].lastName);
			setCompany(props.contact.items[index].company);
			setAddress(props.contact.items[index].address);
			setZip(props.contact.items[index].zip);
			setCity(props.contact.items[index].city);
			setEmail(props.contact.items[index].email);
			setPhone(props.contact.items[index].phone);
			setStatus(props.contact.items[index].status);
			setDescription(props.contact.items[index].description);
		}

	}, [props])
	
	
	const onSubmitForm = ()=>{
	    let data = {
	        firstName: firstName,
	        lastName: lastName,
	        company: company,
	        address: address,
	        zip: zip,
	        city: city,
	        email: email,
	        phone: phone,
	        status: status,
	        description: description,
            user_id: props.user.infos.id, 
            prospect_id:props.match.params.id
	    }
	    
	    editProspect(data)
	        .then((res)=>{
	            console.log(res);
	            if(res.status === 200) {
	            	setRedirect(true);
	            	getAllProspect(props.user.infos.id)
	            		.then((result)=>{
	            			props.loadProspect(result.result);
	            		})
	            }
	        })
	}
	
	return (
		<div>
			{redirect && <Redirect to={"/details/"+props.match.params.id} />}
			<h2>Modification du prospect</h2>
			<form 
				className="form-trl bgc-bel-air" 
				style={{width: "40%"}}
				onSubmit={(e)=>{
					e.preventDefault()
					onSubmitForm()
				}}
			>
				<input 
					type="text" 
					placeholder="Prénom"
					value={firstName}
					onChange={(e)=>{
						setFirstName(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Nom"
					value={lastName}
					onChange={(e)=>{
						setLastName(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="entreprise"
					value={company}
					onChange={(e)=>{
						setCompany(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="adresse"
					value={address}
					onChange={(e)=>{
						setAddress(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="code postal"
					value={zip}
					onChange={(e)=>{
						setZip(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="ville"
					value={city}
					onChange={(e)=>{
						setCity(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="email"
					value={email}
					onChange={(e)=>{
						setEmail(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="téléphone"
					value={phone}
					onChange={(e)=>{
						setPhone(e.currentTarget.value)
					}}
				/>
				<select
				    value={status}
					onChange={(e)=>{
						setStatus(e.currentTarget.value)
					}}
				>
					<option value="prospect">prospect</option>
					<option value="attente">en attente</option>
					<option value="client">client</option>
				</select>
				<textarea
					type="text" 
					placeholder="description"
					value={description}
					onChange={(e)=>{
						setDescription(e.currentTarget.value)
					}}
				>

				</textarea>
				<input style={{cursor: "pointer"}} type="submit" value="enregistrer"/>
			</form>
		</div>
	)
}


const mapDispatchToProps = {
	loadProspect
}

const mapStateToProps = (store)=>{
	return {
		user: store.user,
		contact: store.contact
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProspect);