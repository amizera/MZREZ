import React, { Component } from 'react';
import { Amplify, Storage, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
//import './AddPhoto.css';
import { Box, Button } from '@mui/material';


class AddPhoto extends Component {

        
    state = {
        photoFile: "wyg"
    }
    
    add = (e) => {
        console.log("event target file: " + e.target.files)
        
        this.setState(prevState => ({ photoFile: URL.createObjectURL(e.target.files[0]) }))
    }
    
    
    render() {  
        //console.log(handleChange)
        return (
            <Box  >
                                    
                {this.props.render(this.state.photoFile, this.add)}
        
            </Box>
        );
    }
}

export default AddPhoto