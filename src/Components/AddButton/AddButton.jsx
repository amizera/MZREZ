import React, { Component } from 'react';
import { Box, Button } from '@mui/material';
import { AddAPhoto as AddAPhotoIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';

class AddButton extends Component {
    
    render() {
        //console.log(this)
        const { uploading, imgToUpload, imgUploaded } = this.props;

        return (
            <Box>
                <input
                    accept="image/*"
                    id="button-add-picture"
                    multiple
                    type="file"
                    onChange={this.props.onChange}
                    style={{ display: 'none' }}
                />
                <label htmlFor="button-add-picture">
                    <Button variant="contained"
                        size="large"
                        color="secondary"
                        component="span"
                        disabled={uploading}
                    >
                    {
                        uploading ?
                            <Box paddingLeft={1} component='span'>
                                <Typography component='span'>
                                    Wgrywam: {imgUploaded+1} z {imgToUpload}
                                </Typography>
                            </Box> :
                            null
                    }
                    { !uploading ? <AddAPhotoIcon /> : null }
                    </Button>
                </label>
            </Box>
        )
    }
}
export default AddButton