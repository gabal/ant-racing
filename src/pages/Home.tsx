import React, { Component } from 'react';
import AntRace from '../components/AntRace';
import {Button, AppBar, IconButton, Typography, Container, Toolbar, Box, Grid} from '@material-ui/core';

class Home extends Component {
    login = () => {
        const props:any = this.props;
        props.auth.login();
    }
    logout = () => {
        const props: any = this.props;
        props.auth.logout();
    }
    refreshPage = () => { 
        window.location.reload(); 
    }
    render() {
        const props:any = this.props;
        const { isAuthenticated } = props.auth;
        return (
            <div>
                {
                    isAuthenticated() &&
                    <div>
                        <AppBar position="fixed">
                            <Toolbar>
                                <IconButton edge="start" color="inherit" aria-label="menu" onClick={ this.refreshPage }>
                                    <img src='./logo-white48.png' width="24" height="24" alt="Ant Racing"/>
                                </IconButton>
                                <Typography variant="h6" className='title'>
                                    Ant Racing
                                </Typography>
                                <Button color="inherit" onClick={this.logout}>Log Out</Button>
                            </Toolbar>
                        </AppBar>
                        <AntRace />
                    </div>
                }
                {
                    !isAuthenticated() && (
                        <div>  
                            <AppBar position="fixed">
                                <Toolbar>
                                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={ this.refreshPage }>
                                        <img src='./logo-white48.png' width="24" height="24" alt="Ant Racing"/>
                                    </IconButton>
                                    <Typography variant="h6" className='title'>
                                        Ant Racing
                                    </Typography>
                                    <Button color="inherit" onClick={this.login}>Login</Button>
                                </Toolbar>
                            </AppBar>
                            <Container maxWidth="sm">
                                <Box my={8}>
                                    <Typography variant="h2" component="h1" align="center" color="textPrimary" gutterBottom={true}>
                                        Ant Racing 
                                    </Typography>
                                    <Typography component="p" align="center" color="textSecondary" gutterBottom={true}>
                                        Welcome to the exciting world of competitive ant racing scene. Prepare to be informed about the latest information of your favorite ants and their <strong>ant</strong>agonists.
                                    </Typography>
                                    <Box my={4}>
                                        <Grid container justify="center" alignItems="center"  spacing={2}>
                                            <Button variant="contained" color="primary" onClick={this.login}>To the Ant-Login</Button>
                                        </Grid>
                                        </Box>
                                </Box>
                            </Container>
                        </div>
                    )
                }
            </div>
        );
    }
}
export default Home;