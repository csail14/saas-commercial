import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {addNewProspect,getAllProspect} from '../../api/prospectApi';
import {loadProspect} from '../../actions/prospect/prospectActions';
import {validateInputField} from '../../helpers/form-validator';


const AddProspect = (props)=>{

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
	const [redirect, setRedirect]= useState(false);
	const [err, setErr] = useState("");
	
	
	const onSubmitForm = ()=>{
		setErr("");
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
	        user_id: props.user.infos.id
		}
		let error = formValidator(data);
		console.log("resultat fonction", error)
		if (error===""){
			console.log("entré dans add")
			addNewProspect(data)
	        .then((res)=>{
				console.log(res)
				if (res.status===200){
					getAllProspect(props.user.infos.id)
                    .then((result)=>{
						console.log(result)
                        props.loadProspect(result.result)
                        setRedirect(true);
                    })
				}
				else{
					setErr("Erreur lors de l'enregistrement du prospect")
				}
                
	        })
		}
	}

	const formValidator= (data)=>{
		let error=false;
		for (let key in data){
			error = validateInputField(key, "string", data[key])
			if (error !== ""){
				setErr(error)
				return error
			}
		}
		if(validateInputField('zip', 'number',data.zip) !== ""){
			setErr(validateInputField('zip', 'number',data.zip))
			return validateInputField('zip', 'number',data.zip)
		}
		if(validateInputField('phone', 'number',data.phone) !== ""){
			setErr(validateInputField('phone', 'number',data.phone))
			return validateInputField('phone', 'number',data.phone)
		}
		if(validateInputField('email', 'email',data.email) !== ""){
			setErr(validateInputField('email', 'email',data.email))
			return validateInputField('email', 'email',data.email)
		}
		return ""
	}
	
	return (
		<div>
			{redirect && <Redirect to="/home" />}
			<h2>Ajout d'un prospect</h2>
			<h2 style={{color:"red"}}>{err}</h2>
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
					onChange={(e)=>{
						setFirstName(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Nom"
					onChange={(e)=>{
						setLastName(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="entreprise"
					onChange={(e)=>{
						setCompany(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="adresse"
					onChange={(e)=>{
						setAddress(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="code postal"
					onChange={(e)=>{
						setZip(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="ville"
					onChange={(e)=>{
						setCity(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="email"
					onChange={(e)=>{
						setEmail(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="téléphone"
					onChange={(e)=>{
						setPhone(e.currentTarget.value)
					}}
				/>
				<select
				
					onChange={(e)=>{
						setPhone(e.currentTarget.value)
					}}
				>
					<option value="prospect">prospect</option>
					<option value="attente">en attente</option>
					<option value="client">client</option>
				</select>
				<textarea
					type="text" 
					placeholder="description"
					onChange={(e)=>{
						setDescription(e.currentTarget.value)
					}}
				>
				</textarea>
				<input type="submit" value="enregistrer"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProspect);