import React, { Component } from 'react';
import { Box, List, Divider, ListItem, ListItemIcon, ListItemText, Drawer, AppBar, Toolbar, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Menu as MenuIcon, Person as PersonIcon, Help } from '@mui/icons-material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import './Layout.scss';
import { ProjectsRoute, HomeRoute } from '../Routing';
import { Link } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Auth, Hub } from 'aws-amplify';
import { width } from '@mui/system';



    const drawerWidth = 250;
    const drawerMargin = drawerWidth / 2;
    const color = 'red';
    
    const theme = createTheme({

        palette: {
            primary: {
                main: '#fefefe',
            },
            secondary: {
                main: 'rgba(23, 37, 42, 1)',
            },
        }

    });

    class Layout extends Component {
        
        constructor() {
            super();
            this.updateLoggedStatus = this.updateLoggedStatus.bind(this)
        }

        componentDidMount() {
            this.updateLoggedStatus();
            Hub.listen('auth', this.updateLoggedStatus);
        }

        componentWillUnmount() {
            Hub.remove('auth');
        }

        async updateLoggedStatus() {
            const username = await this.getCurrentUsername()
            let newLoggedStatus = false;
            if (username) newLoggedStatus = true;
            this.setState({ isLogged: newLoggedStatus });
        }

        getCurrentUsername() {
            return new Promise((resolve, reject) => {
            Auth.currentAuthenticatedUser()
            .then(user => {
                if (user.username) {
                    console.log(user.username)
                    resolve(user.username)
                } else {
                    console.log(user)
                    resolve(null)
                }
            })
            .catch(err => {
                console.log(err)
                resolve(null)
            });
            })
        }

        async onSignOutClick() {
            await Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));
        }


        state = {
            mobileOpen: false,
            isLogged: false,
        };
    
        handleDrawerToggle = () => {
            this.setState(state => ({ mobileOpen: !state.mobileOpen }));
        };
    
        render() {
            
            const { mobileOpen, isLogged } = this.state;

            const drawer = (
                <div id="drawer-container">
                    <div className="logo-drawer" />
                    <List >
                        <ListItem 
                        button component={Link} to={HomeRoute} 
                        onClick={mobileOpen ? this.handleDrawerToggle : null}>
                            <ListItemIcon>
                                <Help sx={{ color: theme.palette.primary.main}}/>
                            </ListItemIcon>
                            <ListItemText primary="oRezerwacjach" />
                        </ListItem>
                        <Divider />

                        <ListItem 
                        button component={Link} to={ProjectsRoute} 
                        onClick={mobileOpen ? this.handleDrawerToggle : null}>
                            <ListItemIcon>
                                <PersonIcon sx={{ color: theme.palette.primary.main}}/>
                            </ListItemIcon>
                            <ListItemText primary="Obiekty" />
                        </ListItem>
                        <Divider />
                        {
                        isLogged ?
                            <List>
                            <ListItem button onClick={this.onSignOutClick}>
                            <ListItemIcon>
                                <ExitToAppIcon sx={{ color: theme.palette.primary.main}} />
                            </ListItemIcon>
                            <ListItemText primary="Wyloguj" />
                            </ListItem>
                            </List>
                            :
                            null
                        }
                    </List>
                </div>
            );

            return (
                <Box >
                   
                    <div id="main-layout">
                        <ThemeProvider theme={theme}>
                            <Box sx={{display: 'block'}}>

                                <Box sx={{ display: { xs: 'block',  md: 'none' } }} >
                                    <AppBar position="fixed" color="secondary">
                                        <Toolbar>
                                            <IconButton
                                                color="inherit"
                                                aria-label="Open drawer"
                                                onClick={this.handleDrawerToggle}
                                            >
                                                <MenuIcon />
                                            </IconButton>
                                            <Typography variant="h6" color="inherit" /*className={classes.title}*/>
                                                MZ Rezerwacje
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                </Box>

                                <Box>
                                    <Box sx={{ display: { sm: 'none', xs: 'block' } }} >
                                    
                                        <Drawer
                                            color="primary"
                                            variant="temporary"
                                            open={mobileOpen}
                                            onClose={this.handleDrawerToggle}
                                            anchor="left"
                                            PaperProps={{
                                                sx: {
                                                    width: drawerWidth,
                                                    backgroundColor: theme.palette.secondary.main,
                                                    color: theme.palette.primary.main,
                                                    border: "none",
                                                }
                                            }}
                                        >
                                            {drawer}
                                        </Drawer>
                                    
                                    </Box>

                                    <Box sx={{ display: { xs: 'none', md: 'block'  } }} >
                                    
                                        <Drawer
                                            variant="permanent"
                                            open
                                            PaperProps={{
                                                sx: {
                                                    width: drawerWidth,
                                                    backgroundColor: theme.palette.secondary.main,
                                                    color: theme.palette.primary.main,
                                                    border: "none",
                                                }
                                            }}
                                        >
                                            {drawer}
                                        </Drawer>
                                    
                                    </Box>
                                </Box>

                                <Box width="100%" className="mainContent" sx={{ ml: { xs: 2, md: 6 }, mt: 2}}>
                                    
                                        {this.props.children}
                                    
                                </Box>
                            </Box>
                        </ThemeProvider>
                    </div>
                </Box>
            );
        }
    }
    
    
export default Layout