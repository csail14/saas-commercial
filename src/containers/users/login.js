import React from 'react';
import {Redirect} from 'react-router-dom';
import {loginUser} from '../../api/userApi';
import LoginImg from '../../assets/images/login.jpg'
import {Link} from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            error: null
        }
        this.email = "";
        this.password = "";
    }
    
    onChangeText(type, text) {
        this[type] = text;
    }
    
    onSubmitForm = (e)=>{
        e.preventDefault();
        let data = {
            email: this.email,
            password: this.password
        }
        console.log(data);
        loginUser(data)
        .then((res)=>{
            console.log(res);
            if(res.status === 200) {
                window.localStorage.setItem('user-token', res.token);
                this.setState({redirect:true})
            } else if (res.status === 404){
               this.setState({error: res.msg})
            } else if (res.status === 401) {
                this.setState({error: res.msg})
            } else {
                this.setState({error: 'Un problème est survenu !'})
            }
        })
    }
    
    render() {
        console.log(this.state.redirect)
        return (
            <div className="login-div">
                {this.state.redirect && <Redirect to="/home" />}
                {this.state.error !== null && <p style={{color: "red"}}>{this.state.error}</p>}
                <div  className="b-form">
                <form 
                    className="b-form"
                    onSubmit={(e)=>{
                        this.onSubmitForm(e)
                    }}
                >
                    <div>
                    <input 
                        type="text"
                        placeholder="Votre mail"
                        onChange={(e)=>{
                            this.onChangeText('email', e.currentTarget.value)
                        }}
                    />
                    </div>
                    <div>
                    <input 
                        type="password"
                        placeholder="Votre mot de passe"
                        onChange={(e)=>{
                            this.onChangeText('password', e.currentTarget.value)
                        }}
                    />
                    <Link to="/forgot"><span>Mot de passe oublié ?</span></Link>
                    </div>
                                    
                    
                    <input type="submit" value="Enregistrer" name="Enregistrer" />
                    
                    
                
                </form>
                </div>
                <div className="login-img">
                    <img src={LoginImg}/>
                </div>
                
            </div>
        )
    }
}

export default Login;