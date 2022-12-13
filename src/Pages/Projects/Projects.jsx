import React, { Component } from 'react';
import { Amplify, Storage, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './Projects.css';
import UploadImage from '../../Components/UploadImage/UploadImage';

import { formFields } from '../../Config/AuthConfig';
import AddButton from '../../Components/AddButton/AddButton'
import { Container, Typography} from '@mui/material';
import { v4 as uuid } from 'uuid';

import awsExports from '../../aws-exports';
Amplify.configure(awsExports);

export default class Projects extends Component {

    render() {

  //      const { uploading, imgToUpload, imgUploaded } = this.state
  //      console.log(uploading)

    return (

        <Authenticator formFields={formFields} >
             {({ signOut, user }) => (
                <Container maxWidth='md' style={{backgroundColor: "#2e2efe", padding: 20}}>
                    <Typography variant='h3'>Album</Typography>
                    <UploadImage >
                        <AddButton />  
                    </UploadImage>
                </Container>
             )}
        </Authenticator>

    );
}}
