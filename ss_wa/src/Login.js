import React, { Component } from "react";
import './Login.css';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import logo from './assets/iconLogo256.png';
import { FaExclamationCircle } from 'react-icons/fa';
import { IconContext } from "react-icons";
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            username: '',
            showPassword: false,
            password: '',
            error: false,
            error_msg: "",
            usernameError: false,
            passwordError: false,
        };

        this.primaryColor = '#61dafb';
        this.theme = createMuiTheme({
            palette: {
                primary: {
                    main: this.primaryColor,
                    contrastText: '#FFFFFF !important',
                },
                fontFamily: '"ProductSans"',
                secondary: {
                    main: "#FFF",
                },
                tr: {
                    background: "#f1f1f1",
                    '&:hover': {
                        background: "#FFFFFF !important",
                    },
                },
            },
        });

        this.StyledTextField = withStyles({
            root: {
                marginTop: '1.2vh',
                fontFamily: 'ProductSans !important',
                color: '#FFFFFF !important',
                '& label.MuiInputLabel-outlined': {
                    color: 'white',
                },
                '& label.Mui-focused': {
                    color: this.primaryColor,
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: this.primaryColor,
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5);',
                        color: 'white'
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.75);',
                        color: 'white'
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: this.primaryColor,
                    },
                },
            },
            input: {
                color: "white !important"
            }
        })(TextField);

        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.validateData = this.validateData.bind(this);

        this.handleMouseDownPassword = event => {
            event.preventDefault();
        };
    }

    handleChange(event) {
        var prop = String(event.target.id);
        this.setState({
            [prop]: event.target.value
        });
    }

    handleClickShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    validateData() {
        var flag = true;
        this.setState({ usernameError: false });
        this.setState({ passwordError: false });

		if (this.state.username === "") {
			flag = false;
			this.setState({ usernameError: true });
		} else {
			this.setState({ usernameError: false });
		}

		if (this.state.password.length < 8) {
			flag = false;
			this.setState({ passwordError: true });
		} else {
			this.setState({ passwordError: false });
		}

		return flag;
	}

    render(){
        return(
            <div className="Login">
                <center>
                    <img className="logo_login" src= {logo} alt="logo"/>
                </center>
                <h3 className="title">Inicia Sesion</h3>
                <div className="error_msg" style={this.state.error ? {} : { display: 'none' }}>
                    <div className="help">
                        <IconContext.Provider value={{ size: "2rem ", className: 'help_icon'}}>
                            <div>
                                <FaExclamationCircle/>
                            </div>
                        </IconContext.Provider>
                    </div>
                    <span>{this.state.error_msg}</span>
                </div>
                <div className="text_field_container">
                    < this.StyledTextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Nombre de usuario"
                        name="username"
                        autoComplete="username"
                        onChange={this.handleChange}
                        error={this.state.usernameError && this.state.username.length === 0}
                        helperText={this.state.usernameError && this.state.username.length === 0 ? "Este campo es obligatorio" : ""}
                    />

                    < this.StyledTextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Contraseña"
                        id="password"
                        autoComplete="current-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        error={this.state.passwordError && this.state.password.length < 8}
                        helperText={this.state.passwordError && this.state.password.length < 8 ? "La contraseña debe tener mínimo 8 caracteres" : ""}
                        onChange={this.handleChange}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}>
                                {(this.state.showPassword) ? (<VisibilityOff />) : (<Visibility />)}
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                    />
                <div className="submit_btn_container">
                    <div className="submit_btn" onClick={() => {
                        if(this.validateData()){
                            let loginData = {
                                username: this.state.username,
                                password: this.state.password
                            };
                            console.log(loginData);
                            axios({
                                url: 'http://ec2-107-20-134-136.compute-1.amazonaws.com:5000/graphql',
                                method: 'post',
                                data: {
                                    query: `
                                        query{
                                            Login(model: {
                                                    UserName: "${loginData.username}",
                                                    Password: "${loginData.password}"
                                                }) {
                                                error, response, token, user{ id, userName, name, lastName, email, country, picture, imageBytes, totalGames, wonGames, lostGames }
                                            }
                                        }`
                                }
                            }).then((result) => {
                                console.log(result)
                                if(result.data.data.Login.error === true){
                                    this.setState({
                                        error: true,
                                        error_msg: result.data.data.Login.response
                                    });
                                }
                                else{
                                    //Username: galdana, password: Proyecto.123
                                   let request_res = result.data.data.Login;
                                   this.setState({
                                       error: false,
                                       error_msg: "",
                                       userData: {
                                           token: request_res.token,
                                           user: request_res.user
                                       }
                                   });
                                   this.LinkElement.click();
                                }

                            }, (error) => {
                                console.log(error);
                                this.setState({
                                    error: true,
                                    error_msg: "Ha ocurrido un error con el servidor. Intentelo nuevamente"
                                });
                            });
                        }
                    }}>
                        <p>Iniciar sesion</p>
                    </div>
                    <Link to={{
                        pathname: '/',
                        state: {
                            data: this.state.userData 
                        }}}
                        ref={Link => this.LinkElement = Link}>
                    </Link>
                </div>
                </div>
                <div className="login_link">
                    <a href="#"> ¿Olvidaste tu contraseña? </a>
                </div>
                <Box mt={5}>
                    < div className="login_link" >
                        <p>¿No tienes una cuenta? </p> <a href="/Register" > Regístrate </a>
                    </div>
                </Box>
            </div>
        )
    }
}

export default Login;
