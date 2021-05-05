import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles,Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Animated} from "react-animated-css";
import { useState} from "react";
import 'animate.css';
import Box from '@material-ui/core/Box';
import { postLogin, postRegister } from '../Api/UserApi';
import { useStyles } from '../Styles/style';

export const RegisterLoginPage = () =>{
    const classes = useStyles();
    const [loginOpen, setLoginOpen] = useState<boolean>(true);
    const [signInOpen, setSignInOpen] = useState<boolean>(false);
    const [login, setLogin] = useState<string>("Login");
    const [password, setPassword] = useState<string>("Password");
    const handleOpen = () =>{
        setLoginOpen(!loginOpen);
        setSignInOpen(!signInOpen);
    }    
    const handleChangeLoginLogin = (login: string) => {
        setLogin(login);
    }
    const handleChangePasswordLogin = (password: string) => {
        setPassword(password);
    }
    const handleLogging = () => {
        postLogin(login, password);
    }
    const handleChangeLoginRegister = (login: string) => {
        setLogin(login);
    }
    const handleChangePasswordRegister = (password: string) => {
        setPassword(password);
    }
    const handleRegister = () => {
        postRegister(login, password);
    }
    const onEnterDown = (event : any) => {
        if(event.key == "Enter") {
            event.preventDefault();
            if (loginOpen) 
                handleLogging() 
            else {
                handleRegister();
                handleOpen(); // after register (succesful or not) switch to login page
            }
        }
    }
    return (
        <div className={classes.windowContainer}>
            <Box display="flex" flexDirection="row" p={1} m={1} alignSelf="center"
                                 >
                <Box p={1} m={1}>
                    {loginOpen ?
                        <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={loginOpen}   >
                            <Container fixed className={classes.formContainer} >
                                <div className={classes.welcomeLabel}>Log in</div>
                                <TextField id="standard-login" label="Login" variant="filled" className={classes.textFieldStyle}
                                    onChange={(event: any) => handleChangeLoginLogin(event.target.value)} onKeyDown={onEnterDown}/>
                                <TextField id="standard-password" label="Password" type="password" variant="filled" className={classes.textFieldStyle}
                                    onChange={(event: any) => handleChangePasswordLogin(event.target.value)} onKeyDown={onEnterDown}/>
                                <Button variant="contained" style={{borderRadius: '15px'}} onClick={handleLogging}> Log in</Button>
                            </Container>
                        </Animated>              
                    :  
                        <Container fixed className={classes.formContainerOverlay}>
                            <div className={classes.welcomeLabel}>Hello, Friend!</div>
                            <div className={classes.welcomeLabelSmall}>Enter your personal data and begin journey with us</div>
                            <div className={classes.welcomeLabelSmall}>Don't have account yet? Sing up here!</div>
                            <Button variant="outlined" onClick={() => handleOpen()} style={{borderRadius: '15px'}}>Sign in</Button>
                        </Container>                      
                    }
                </Box>
                <Box p={1} m={1}>
                    {signInOpen ?
                        <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={signInOpen}>
                            <Container fixed className={classes.formContainer}>
                                <div className={classes.welcomeLabel}>Sign up</div>
                                <TextField id="standard-login" label="Login" variant="filled" className={classes.textFieldStyle}
                                    onChange={(event: any) => handleChangeLoginRegister(event.target.value)} onKeyDown={onEnterDown}/>
                                <TextField id="standard-password" type="password" label="Password" variant="filled" className={classes.textFieldStyle}
                                    onChange={(event: any) => handleChangePasswordRegister(event.target.value)} onKeyDown={onEnterDown}/>
                                {/* <TextField id="standard-password-confirm" label="Password Confirm" variant="filled" className={classes.textFieldStyle}/> */}
                                <Button variant="contained" style={{borderRadius: '15px'}} onClick={() => {handleRegister(); handleOpen()} }> Sign up</Button>
                            </Container>
                        </Animated>
                    :
                        <Container fixed className={classes.formContainerOverlay}>
                            <div className={classes.welcomeLabel}>Welcome Back!</div>
                            <div className={classes.welcomeLabelSmall}>To keep conected with us please login with your personal data</div>
                            <div className={classes.welcomeLabelSmall}>Have account already? Sign in here!</div>
                            <Button variant="outlined" onClick={() => handleOpen()} style={{borderRadius: '15px'}}>Sign up</Button>
                        </Container>           
            }
                </Box>
            </Box>  
        </div>
    )
}
