import React, { Component } from "react";
import './User.css';
import {Link} from 'react-router-dom';

class confirmRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userEmail: this.props.location.state.data
        };

        console.log(this.state.sentData);
    }

    render(){
        return(
            <div className="confirmRegistration">
                <h1>Verifica tu cuenta</h1>
                <p>Enviamos un correo de verificacion a <bold><span className="email">{this.state.userEmail}</span></bold></p>
                <p>Despues de que hayas verificado tu cuenta puedes continuar</p>
                <div className="submit_btn" onClick={() => {this.LinkElement.click()}}>
                    <p>Iniciar sesion</p>
                </div>
                <Link to={{
                        pathname: '/Login'
                    }}
                    ref={Link => this.LinkElement = Link}>
                </Link>
            </div>
        )
    }
}

export default confirmRegister;