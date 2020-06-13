import React, { Component } from "react";
import './Login.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import logo from './assets/iconLogo256.png';
import { FaExclamationCircle } from 'react-icons/fa';
import { IconContext } from "react-icons";
import axios from 'axios';



class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: '',
            profilephoto: "https://www.materialui.co/materialIcons/content/add_circle_grey_192x192.png",
            email: '',
            username: '',
            name: '',
            lastname: '',
            showPassword: false,
            showConfirmPassword: false,
            password: '',
            confirmPassword: '',
            country: '',
            emailError: false,
            emailErrorText: "",
            usernameError: false,
            nameError: false,
            lastnameError: false,
            passwordError: false,
            signUpError: false,
            error: false,
            error_msg: '',
            uri: '',
            sentEmail: ''
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

        this.StyledFormControl = withStyles({
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
        })(FormControl);

        this.handleChange = this.handleChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.validateData = this.validateData.bind(this);

        this.handleMouseDownPassword = event => {
            event.preventDefault();
        };

        this.handleClickShowConfirmPassword = this.handleClickShowConfirmPassword.bind(this);

        this.handleMouseDownConfirmPassword = event => {
            event.preventDefault();
        };

    }

    onImageChange(event){
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ profilephoto: e.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        this.setState({ file: this.generateGuid() + event.target.files[0].name });
    }

    handleClickShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    generateGuid()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          }); 
    }

    handleClickShowConfirmPassword() {
        this.setState({
            showConfirmPassword: !this.state.showConfirmPassword
        });
    }

    handleChange(event) {
        var prop = String(event.target.id);
        this.setState({
            [prop]: event.target.value
        });
    }

    handleCountryChange(event) {
        this.setState({
            country: event.target.value
        });
    }
    
    validateData() {
        var flag = true;
        this.setState({ emailError: false });
        this.setState({ usernameError: false });
        this.setState({ passwordError: false });
		var mailformat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (this.state.email == "") {
			flag = false;
			this.setState({ emailError: true });
			this.setState({ emailErrorText: "Este campo es obligatorio" });
		} else if (!this.state.email.match(mailformat)) {
			console.log("in 2");
			flag = false;
			this.setState({ emailError: true });
			this.setState({ emailErrorText: "El email ingresado no es valido" });
		} else {
			this.setState({ emailError: false });
			this.setState({ emailErrorText: "" });
		}

		if (this.state.username == "") {
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
                    <div className="text_field_container_big">
                        <h3 className="title"> Registrate </h3>
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
                        <div>
                            <div className="image-upload">
                                < label htmlFor="file-input" >
                                    <div className="profilepic">
                                        <img id="target" className="crop" src={this.state.profilephoto} ></img>
                                    </div>
                                </label>
                                <input id="file-input" name="profilePhoto" type="file" onChange={this.onImageChange} />
                            </div>
                            <h6>Sube una foto para tu avatar</h6>
                        </div>
                        <this.StyledTextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Correo electronico*"
                            name="email"
                            autoComplete="email"
                            onChange={this.handleChange}
                            error={this.state.emailError}
                            helperText={this.state.emailError ? this.state.emailErrorText : ""}
                        />

                        <this.StyledTextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id = "username"
                            label="Nombre de Usuario*"
                            name="username"
                            autoComplete="username"
                            onChange={this.handleChange}
                            error={this.state.usernameError  && this.state.username.length === 0}
                            helperText={this.state.usernameError  && this.state.username.length === 0 ? "Este campo es obligatorio" : ""}
                        />

                        <Grid container
                            spacing={2}
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-end"
                            wrap="nowrap" >
                            <Grid item xs={6}>
                                <this.StyledTextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="name"
                                    label="Nombre"
                                    name="name"
                                    autoComplete="name"
                                    onChange={this.handleChange}
                                    error={this.state.nameError}
                                    helperText={this.state.nameError ? "Este campo es obligatorio" : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <this.StyledTextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="lastname"
                                    label="Apellido"
                                    name = "lastname"
                                    autoComplete="lastname"
                                    onChange={this.handleChange}
                                    error={this.state.lastnameError}
                                    helperText={this.state.lastnameError ? "Este campo es obligatorio" : ""}
                                />
                            </Grid>
                        </Grid>

                        <ThemeProvider theme={this.theme}>
                            <div className="columns_container">
                                <this.StyledFormControl
                                    variant="outlined"
                                    fullWidth>
                                    <InputLabel htmlFor="outlined-age-simple">
                                        País
                                    </InputLabel>
                                    <Select
                                        fullWidth
                                        value={this.state.country}
                                        onChange={this.handleCountryChange}
                                        labelWidth={54}
                                        inputProps={{
                                            country: 'age',
                                            id: 'outlined-age-simple',
                                        }}>
                                        <MenuItem value="Espana">España</MenuItem>
                                        <MenuItem value="Argentina">Argentina</MenuItem>
                                        <MenuItem value="Bolivia">Bolivia</MenuItem>
                                        <MenuItem value="Brasil">Brasil</MenuItem>
                                        <MenuItem value="Chile">Chile</MenuItem>
                                        <MenuItem value="Colombia">Colombia</MenuItem>
                                        <MenuItem value="CostaRica">Costa Rica</MenuItem>
                                        <MenuItem value="Cuba">Cuba</MenuItem>
                                        <MenuItem value="Ecuador">Ecuador</MenuItem>
                                        <MenuItem value="ElSalvador">El Salvador</MenuItem>
                                        <MenuItem value="GuayanaFrancesa">Guayana Francesa</MenuItem>
                                        <MenuItem value="Granada">Granada</MenuItem>
                                        <MenuItem value="Guatemala">Guatemala</MenuItem>
                                        <MenuItem value="Guayana">Guayana</MenuItem>
                                        <MenuItem value="Haiti">Haití</MenuItem>
                                        <MenuItem value="Honduras">Honduras</MenuItem>
                                        <MenuItem value="Jamaica">Jamaica</MenuItem>
                                        <MenuItem value="Mexico">México</MenuItem>
                                        <MenuItem value="Nicaragua">Nicaragua</MenuItem>
                                        <MenuItem value="Paraguay">Paraguay</MenuItem>
                                        <MenuItem value="Panamá">Panamá</MenuItem>
                                        <MenuItem value="Peru">Perú</MenuItem>
                                        <MenuItem value="PuertoRico">Puerto Rico</MenuItem>
                                        <MenuItem value="RepúblicaDominicana">República Dominicana</MenuItem>
                                        <MenuItem value="Surinam">Surinam</MenuItem>
                                        <MenuItem value="Uruguay">Uruguay</MenuItem>
                                        <MenuItem value="Venezuela">Venezuela</MenuItem>
                                    </Select>
                                </this.StyledFormControl>

                            </div>
                        </ThemeProvider>

                        <Grid container
                            spacing={2}
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-end"
                            wrap="nowrap" >
                            <Grid item xs={6}>
                                <this.StyledTextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Contraseña*"
                                    id="password"
                                    autoComplete="current-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    error={this.state.passwordError && this.state.password.length < 8}
                                    helperText={this.state.passwordError && this.state.password.length < 8 ? "La contraseña debe tener mínimo 8 caracteres" : ""}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    color = "#FFFFFF"
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                    onMouseDown={this.handleMouseDownPassword}>
                                                    {(this.state.showPassword) ? (<VisibilityOff />) : (<Visibility />)}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <this.StyledTextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirmar contraseña*"
                                    id="confirmPassword"
                                    autoComplete="confirm password"
                                    type={this.state.showConfirmPassword ? 'text' : 'password'}
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                    error={
                                        this.state.confirmPassword !== this.state.password
                                    }
                                    helperText={
                                        this.state.confirmPassword !== this.state.password ? "Las contraseñas deben coincidir" : ""
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowConfirmPassword}
                                                    onMouseDown={this.handleMouseDownConfirmPassword}>
                                                    {(this.state.showConfirmPassword) ? (<VisibilityOff />) : (<Visibility />)}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <div className="submit_btn_container">
                            <div className="submit_btn" onClick={() => {
                                if (this.state.password === this.state.confirmPassword && this.validateData()){
                                    let registerData = {
                                        profilePhoto: this.state.profilephoto.split(",")[1],
                                        email: this.state.email,
                                        username: this.state.username,
                                        name: this.state.name,
                                        lastname: this.state.lastname,
                                        password: this.state.password,
                                        country: this.state.country,
                                        file: this.state.file
                                    }
                                    console.log(registerData);

                                    axios({
                                        url: 'http://ec2-107-20-134-136.compute-1.amazonaws.com:5000/graphql',
                                        method: 'post',
                                        data: {
                                            query: `
                                            query {
                                                UploadFile(model:{File:"${registerData.profilePhoto}", FileName: "${registerData.file}"}){
                                                  response, error, uri
                                                }
                                              }`
                                        }
                                    }).then((result) => {
                                        console.log("imagen")
                                        console.log(result)

                                        if(result.data.data !== null && result.data.data.UploadFile.error !== true)
                                        {
                                            axios({
                                                url: 'http://ec2-107-20-134-136.compute-1.amazonaws.com:5000/graphql',
                                                method: 'post',
                                                data: {
                                                    query: `
                                                    mutation {
                                                        Register(model:{Picture: "${result.data.data.UploadFile.uri}", 
                                                            Email : "${registerData.email}", 
                                                            Name : "${registerData.name}", 
                                                            LastName : "${registerData.lastname}",
                                                            UserName : "${registerData.username}", 
                                                            Password : "${registerData.password}", 
                                                            ConfirmedPassword : "${registerData.password}",
                                                            Country : "${registerData.country}" }){
                                                            error, response
                                                        }
                                                    }`
                                                }
                                            }).then((result) => {
                                                console.log(result)
                                                if(result.data.data.Register.error !== true ){
                                                    this.setState({
                                                        error: false,
                                                        error_msg: ''
                                                    });
                                                    this.LinkElement.click();
                                                }else{
                                                    this.setState({
                                                        error: true,
                                                        error_msg: "La contraseña debe tener al menos un caracter alfanumerico, una letra en minuscula y una letra en mayuscula"
                                                    });
                                                }
    
                                            }, (error) => {
                                                console.log("error register")
                                                console.log(error);
                                                this.setState({
                                                    error: true,
                                                    error_msg: "Ha ocurrido un error con el servidor. Intentelo nuevamente"
                                                });
                                            });
                                        }
                                        else{
                                            this.setState({
                                                error: true,
                                                error_msg: "Por favor especifique una foto para su avatar"
                                            });
                                        }

                                    }, (error) => {
                                        console.log("Error image");
                                        console.log(error);
                                        this.setState({
                                            error: true,
                                            error_msg: "Ha ocurrido un error con el servidor. Intentelo nuevamente"
                                        });
                                    });

                                }
                            }}>
                                <p>Terminar registro</p>
                            </div>
                            <Link to={{
                                pathname: '/confirmRegistration',
                                state: {
                                    data: this.state.email 
                                }}}

                                ref={Link => this.LinkElement = Link}>
                            </Link>
                            <div className="login_link register_link">
                                <p className="login_text">
                                    ¿Ya tienes una cuenta? <a href="/Login" > Inicia sesión </a>
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
		);
	}
}

export default Register;
