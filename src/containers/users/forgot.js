import React, {useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';
import SecurityImg from '../../assets/images/security.png';
import {forgotPassword} from '../../api/userApi'

const Forgot = (props)=>{
    
    const [email, setEmail] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(null);
	
	const onSubmitForm = ()=>{
	       let data = {
	           email: email
	       }
	       
	      forgotPassword(data)
	      .then((response)=>{
	          console.log(response);
	          setError(response.msg);
	      })
	}
    
    return (
            
            <div className="login-div">
            {redirect && <Redirect to="/home" />}
			{error !== null && <p className="errorMsg">{error}</p>}
            <h3 style={{color:"white"}}>Mot de passe oublié</h3>
                <form 
                    className="b-form"
                    onSubmit={(e)=>{
                        e.preventDefault();
                        onSubmitForm(e)
                    }}
                >
                    
                    <label style={{color:"white"}}>Email</label>
							<input 
								type="text" 
								name="email" 
								onChange={(e)=>{  
									setEmail(e.currentTarget.value);
								}}
							/>
                    
                    
                    <input type="submit" value="Envoyer un nouveau mot de passe" name="Enregistrer" />
                    
                
                </form>
                <div className="login-img">
                    <img src={SecurityImg}/>
                </div>
            </div>
    )
}

export default Forgot