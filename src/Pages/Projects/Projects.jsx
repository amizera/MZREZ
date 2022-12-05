import React, { Component } from 'react';
import { Box } from '@mui/material';
import { Amplify } from '@aws-amplify/core';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './Projects.css';

import { formFields } from '../../Config/AuthConfig';
//import { ThemeProvider, Theme } from '@aws-amplify/ui-react';
//import { myTheme } from '../../Config/AuthTheme';

import awsExports from '../../aws-exports';
Amplify.configure(awsExports);

//console.log(myTheme)
function Projects({  signOut, user }) {
   
    return (

        <Authenticator formFields={formFields} >
             {({ signOut, user }) => (
            <Box>
                Projects
                <Box>
                    <button onClick={signOut}>Sign out</button>
                </Box>
            </Box>
             )}
        </Authenticator>

    );
}

export default Projects;