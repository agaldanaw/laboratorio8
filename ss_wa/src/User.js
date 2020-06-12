import React, { Component } from "react";
import './User.css';
import Navbar from './Navbar.js';
import Grid from '@material-ui/core/Grid';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaGamepad } from 'react-icons/fa';
import { FaTrophy } from 'react-icons/fa';
import { FaSadTear } from 'react-icons/fa';
import { IconContext } from "react-icons";


class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: this.props.location.state.data
        };
    }

    render(){
        console.log(this.state.userData);
        return(
            <div className="User">
                <Navbar userData = {this.props.location.state.data}/>
                <div className="user_content">
                    <Grid container
                        spacing={8}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        wrap="wrap" >
                        <Grid item xs={4}>
                            <div className="profilepicim">
                                <img alt="profile" src={this.state.userData.user.picture}></img>
                            </div>
                            <div className="profile_info">
                                <div>
                                    <h3 className="user_title">{this.state.userData.user.name} {this.state.userData.user.lastName}</h3>
                                    <h5 className="no-margin username"><italic>{this.state.userData.user.userName}</italic></h5>
                                    <div className="profile_info_country">
                                        <IconContext.Provider value={{ size: "1.1em " }}>
                                            <div>
                                                <FaMapMarkerAlt/>
                                            </div>
                                        </IconContext.Provider>
                                        <p>{this.state.userData.user.country}</p>
                                    </div>
                                    <div className="edit_btn">
                                        <p>Editar perfil</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            <div className="leftpanel_container">
                                <div className="score">
                                    <h3 className="no-margin">Score</h3>
                                    <div className="score_container">
                                        <Grid container
                                            spacing={4}
                                            direction="row"
                                            wrap="wrap" >
                                            <Grid item xs={4}>
                                                <div className="score_item">
                                                    <IconContext.Provider value={{ size: "2.5em" ,className: "score_icon"}}>
                                                        <div>
                                                            <FaGamepad/>
                                                        </div>
                                                    </IconContext.Provider>
                                                    <p className="score_title"><bold>Partidas jugadas</bold></p>
                                                    <p className="score_value">{this.state.userData.user.totalGames}</p>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <div className="score_item">
                                                    <IconContext.Provider value={{ size: "2.5em" ,className: "score_icon"}}>
                                                        <div>
                                                            <FaTrophy/>
                                                        </div>
                                                    </IconContext.Provider>
                                                    <p className="score_title"><bold>Partidas ganadas</bold></p>
                                                    <p className="score_value">{this.state.userData.user.wonGames}</p>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <div className="score_item">
                                                    <IconContext.Provider value={{ size: "2.5em" ,className: "score_icon"}}>
                                                        <div>
                                                            <FaSadTear/>
                                                        </div>
                                                    </IconContext.Provider>
                                                    <p className="score_title"><bold>Partidas perdidas</bold></p>
                                                    <p className="score_value">{this.state.userData.user.lostGames}</p>
                                                </div>
                                            </Grid>  
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                            
                        </Grid>
                    </Grid>
                </div>
                
            </div>
        )
    }
}

export default User;