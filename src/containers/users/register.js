import React from 'react'
import {addNewUser} from '../../api/userApi';
import {Redirect} from 'react-router-dom';
import RegisterImg from '../../assets/images/register.png'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            err:null,
            redirect:false
        }
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = ""
    }

    onChangeText(type, text) {
        this[type] = text;
    }

    onSubmitForm = (e)=> {
        e.preventDefault();
        let data = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            role:'user'
        }
        addNewUser(data).then(
            (res)=> {
                console.log(res)
                if(res.status === 200) {
                    this.setState({redirect: true})
                } else {
                    this.setState({error: 'un problème s\'est produit durant l\'utilisateur !'})
                }
            }
        )
    }

    render() {
        console.log(this.state)
        return(
            <div className="register-div">
                {this.state.redirect && <Redirect to="/login" />}
                {this.state.error !== null && <p style={{color: "red"}}>{this.state.error}</p>}
                <form 
                    className="b-form"
                    onSubmit={(e)=>{
                        this.onSubmitForm(e)
                    }}
                >
                    <input 
                        type="text"
                        placeholder="Votre prénom"
                        onChange={(e)=>{
                            this.onChangeText('firstName', e.currentTarget.value)
                        }}
                    />
                    
                    <input 
                        type="text"
                        placeholder="Votre nom"
                        onChange={(e)=>{
                            this.onChangeText('lastName', e.currentTarget.value)
                        }}
                    />
                    
                    <input 
                        type="text"
                        placeholder="Votre mail"
                        onChange={(e)=>{
                            this.onChangeText('email', e.currentTarget.value)
                        }}
                    />
                    
                    <input 
                        type="password"
                        placeholder="Votre mot de passe"
                        onChange={(e)=>{
                            this.onChangeText('password', e.currentTarget.value)
                        }}
                    />
                    
                    
                    <input type="submit" value="Enregistrer" name="Enregistrer" />
                
                </form>
                <div className="register-img">
                    <img src={RegisterImg}/>
                </div>
                
                
            </div>
        )
    }


}


export default Register;