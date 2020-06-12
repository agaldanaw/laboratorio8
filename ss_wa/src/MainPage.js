import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import logoNavbar from './assets/logoNavbar.png';
import bg_image from './assets/bg_mainPage.jpg';
import { FiUser } from 'react-icons/fi';
import { IconContext } from "react-icons";
import { FaCode } from "react-icons/fa";
import './App.css';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            userLogin: false,
        };

        this.handleClick = this.handleClick.bind(this);
        this.setNavbarButtons = this.setNavbarButtons.bind(this);
        this.handleToUser = this.handleToUser.bind(this);
        this.handleToSOAP = this.handleToSOAP.bind(this);
    }

    componentDidMount(){
        if (this.props.location.state !== undefined) {
            console.log("in");
            this.setState({
                userData: this.props.location.state.data,
                userLogin: true
            });
        }
    }

    handleClick() {
        this.LinkElement.click();
    }

    handleToUser(){
        this.UserLinkElement.click();
    }

    handleToSOAP(){
        this.SOAPLinkElement.click();
    }

    setNavbarButtons(){
        if(this.state.userLogin){
            return(<div className="navbarButtons_home">
                        <Grid container
                            spacing={2}
                            direction="row">
                            <Grid item xs={6}>
                                <IconContext.Provider value={{ size: "2.5em ", className: 'Nav-icons_home' }}>
                                    <div onClick={this.handleToSOAP}>
                                        <FaCode/>
                                    </div>
                                    <Link to={{
                                        pathname: '/SOAPTest'}}
                                        ref={Link => this.SOAPLinkElement = Link}>
                                    </Link>
                                </IconContext.Provider>
                            </Grid>
                            <Grid item xs={6}>
                                <IconContext.Provider value={{ size: "2.5em ", className: 'Nav-icons_home' }}>
                                    <div onClick={this.handleToUser}>
                                        <FiUser/>
                                    </div>
                                    <Link to={{
                                        pathname: '/User',
                                        state: {
                                            data: this.state.userData
                                        }}}
                                        ref={Link => this.LinkElement = Link}>
                                    </Link>
                                </IconContext.Provider>
                            </Grid>
                        </Grid>
                    </div>);
        }else{
            return(<div className="navbarButtons_home">
                        <Grid container
                            spacing={2}
                            direction="row">
                            <Grid item xs={4}>
                                <IconContext.Provider value={{ size: "2.5em ", className: 'Nav-icons_home' }}>
                                    <div onClick={this.handleToSOAP}>
                                        <FaCode/>
                                    </div>
                                    <Link to={{
                                        pathname: '/SOAPTest'}}
                                        ref={Link => this.SOAPLinkElement = Link}>
                                    </Link>
                                </IconContext.Provider>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="navbar_link_home">
                                    <a href="/Login"> Inicia Sesion </a>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="navbar_link_home">
                                    <a href="/Register"> Registrate </a>
                                </div>
                            </Grid>
                        </Grid>
                    </div>);
        }
    }

    render(){
        console.log(this.state.userData);
        return (
            <div className="App">
                <div className="bg_image">
                    <img src={bg_image}></img>
                </div>
                <div className="App_overlay">
                    <div className="Navbar_home">
                        <div className="logo_home">
                            <a href="/"><img src={logoNavbar}></img></a> 
                        </div>
                        {this.setNavbarButtons()}
                    </div>
                    <div className="App_content">
                        <h1>Bienvenido a Hanged Drawn</h1>
                        <div className="main_buttons_container">
                            <Grid container
                                spacing={6}
                                direction="row">
                                <Grid item xs={6}>
                                    <div className="main_btn_container">
                                        <div className="main_btn blue" onClick={() => {}}>
                                            <p>Unirse a una sala</p>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="main_btn_container">
                                        <div className="main_btn white" onClick={() => {}}>
                                            <p>Crear una sala</p>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;
