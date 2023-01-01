import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import { AddAPhoto as AddAPhotoIcon } from '@mui/icons-material';
import {useId} from 'react';

export default function Item(props) {
  const { sx, ...other } = props;
  
  return (
    <Box
      id='item'
      
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        m: 0,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export  function ImageBox(props) {
  const id = useId();
 /* const styles = {
      backgroundColor: props.isHeld ? "#59E391" : "white"
  }
  */
  //console.log(props.imageOrder)

  if (document.getElementById(id + 'preview') != null) {
    var preview = document.getElementById(id + 'preview').style.backgroundImage 
  }
  else {
    var preview = false
  }

  return (
    <Item  id={id + 'preview'}
    className='square'
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
      color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
      border: '1px solid',
      borderColor: (theme) =>
        theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
      p: 1,
      m: 1,
      borderRadius: 2,
      fontSize: '0.875rem',
      fontWeight: '700',
      //backgroundImage: `url(${props.image[0]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
      
    }}>

      <input
      name="images"
      type="file"
      accept="image/jpeg, image/png, image/jpg"
      id={id}
      style={{ display: 'none' }}
      onChange={(e) => props.handleImage(e, props.imageOrder)} />
      <label htmlFor={id} className='button'>
        <Button 
        size="small"
        color="secondary"
        component="span"
        >
        { preview ? null : <AddAPhotoIcon sx={{ fontSize: "40px" }} /> }
        </Button>
      </label>
      
    </Item>
  );
}

