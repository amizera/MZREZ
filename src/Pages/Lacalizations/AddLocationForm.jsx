
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Item, {ImageBox} from '../../Components/CustomBoxes/CustomBoxes';
import { Container} from '@mui/material';
import UploadImage from '../../Components/UploadImage/UploadImage'
import AddButton from '../../Components/AddButton/AddButton'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


import {nanoid} from "nanoid";



const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const boxMargin = 2
const tmp_path = ""

export default function AddLocationForm(props) {

  const id = React.useId(); 
  const [file, setFile] = React.useState();

  //const propsy = props.location.images.map()
  console.log(props.location.images)

  function handleImage(e, index) {
      //console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
      
      var tmp_path = URL.createObjectURL(e.target.files[0]);
      document.getElementById(e.target.id + "preview").style.backgroundImage = "url('" + tmp_path + "')";
      //console.log(e.target.id + "preview")
      const {name, value} = e.target
      props.updateLocation(name, tmp_path, index)
      //console.log(URL.createObjectURL(e.target.files[0]))
      console.log(e)
  }

  function handleChange(event) {
    const {name, value} = event.target
    console.log(name)
    props.updateLocation(name, value)
  }

  function handleAdd() {
    props.location.id = nanoid()
    props.addLocation(props.location)
  }
    

  return (
    <Paper
    sx={{
      p: 2,
      margin: 'auto',
      maxWidth: 1000,
      flexGrow: 1,
      backgroundColor: (theme) =>
      theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    }}
    >
      
      <Box  style={{ borderRadius: 5,  padding: 10}} >
        <Typography variant='h5'>dodawanie lokalu</Typography>
      </Box>
                      
      <Box
      component="form"
      noValidate
      autoComplete="off"
      style={{ borderRadius: 5, backgroundColor: "#fefefe", padding: 10}}
      >
        <Box sx={{ mt: 3, mb: 3}}>
          <TextField
            required
            id="standard-required"
            label="Wymagane"
            defaultValue={props.location.name}
            variant="standard"
            name="name"
            onChange={handleChange}
          />
        </Box>

        <Box
        sx={{ mt: 3, mb: 3}}
        noValidate
        autoComplete="off"
        style={{ borderRadius: 5, backgroundColor: "#fefefe" }}
        >
          <TextField
            fullWidth 
            id="outlined-multiline-static"
            label="Opis"
            multiline
            rows={4}
            defaultValue={props.location.description}
            name="description"
            onChange={handleChange}
          />
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', justifyContent: 'space-between'  }} >
          
          <ImageBox handleImage={handleImage} location={props.location} imageOrder="0"/>
          <ImageBox handleImage={handleImage} location={props.location} imageOrder="1"/>
          <ImageBox handleImage={handleImage} location={props.location} imageOrder="2"/>
          
        </Box>  

      </Box>

      <Box  style={{ borderRadius: 5,  padding: 10}} >
        <Button variant="contained"
          size="small"
          color="secondary"
          component="span"
          onClick={handleAdd}
        >
          <Typography >OK</Typography>
        </Button>
                  
      </Box>

    </Paper>
  )
}

