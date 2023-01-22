
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { v4 as uuid } from 'uuid';
import { Storage, Auth } from 'aws-amplify';
import {ImageBox} from '../../Components/CustomBoxes/CustomBoxes';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';

import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

export default function AddLocationForm(props) {

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  const boxMargin = 2
  const tmp_path = ""
  var img = null
  const id = React.useId(); 
  const [file, setFile] = React.useState();
  const [uploading, setUploading] = React.useState(false);
  const [imgToUpload, setImgToUpload] = React.useState(0);
  const [imgUploaded, setImgUploaded] = React.useState(0);
  

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };


  function readFileAsync(file) {
      return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onload = () => {
              resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
      })
  }

  function loadImgAsync(imgSrc) {
      return new Promise((resolve, reject) => {
          let img = new Image();
          img.onload = () => {
              resolve(img);
          };
          img.onerror = reject;
          img.src = imgSrc;
      })
  }



  async function handleImage(e, index) { 

    const file = e.target.files[0];
    const filename = file.name
    const fileExtension = file.name.split('.').pop();
    const rootName = /* username + '/' +*/ filename + '-' + uuid();
    let mainImgName = rootName + '.' + fileExtension;
    let thumbnailImgName = rootName + '-thumbnail.' + fileExtension;

    setFile(URL.createObjectURL(e.target.files[0]));
    
    const imgSrc = await readFileAsync(file);
    const img = await loadImgAsync(imgSrc);
   
    document.getElementById(e.target.id + "preview").style.backgroundImage =  "url('" + imgSrc + "')";
 
    const {name, value} = e.target
    //props.updateLocation(name, imgSrc, filename, index)
    props.handleEditAparmet(name, imgSrc, filename, index)
      
  }


  return (

                      
      <Box
      component="form"
      noValidate
      autoComplete="off"
      style={{ borderRadius: 5, backgroundColor: "#fefefe", padding: 10}}
      >
        <Box sx={{ mt: 3, mb: 3}}>
          <TextField
            sx={{ width: '35ch' }}
            required
            id="standard-required"
            //label="Nazwa"
            placeholder="Nazwij lokalizację"
            //defaultValue={props.apartment.name}
            variant="standard"
            name="name"
            onChange={(event)=>props.handleChange(event, name)}
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
            required
            id="outlined-multiline-static"
            placeholder="Dodaj opis"
            multiline
            rows={7}
            //defaultValue={props.apartment.description}
            name="description"
            onChange={(event)=>props.handleChange(event, name)}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
        <Grid item xs={7}>
          <TextField
            fullWidth 
            sx={{ mr: 2 }}
            required
            id="outlined-multiline-static"
            //label="Ulica"
            placeholder="Ulica"
            //rows={4}
            //defaultValue={props.apartment.street}
            name="street"
            onChange={(event)=>props.handleChange(event, name)}
          />
          </Grid>
          <Grid item xs={2}>
          <TextField
            fullWidth 
            required
            sx={{  mr: 1 }}
            id="outlined-multiline-static"
            //label="Nr"
            placeholder="Nr"
            //rows={4}
            //defaultValue={props.apartment.streetNo}
            name="streetNo"
            onChange={(event)=>props.handleChange(event, name)}
          />
          </Grid>
          <Grid item xs={3}>
          <TextField
            fullWidth 
            sx={{  }}
            id="outlined-multiline-static"
            //label="Numer Apartamentu"
            placeholder="Nr ap."
            //rows={4}
            //defaultValue={props.apartment.locationNo}
            name="props.apartmentNo"
            onChange={(event)=>props.handleChange(event, name)}
          />
          </Grid>
          </Grid>
          </Box>

        <Box sx={{ flexGrow: 1, mt:2 }}>
        <Grid container spacing={2}>
        <Grid item xs={3}>

          <TextField
            fullWidth 
            sx={{ mr: 3}}
            id="outlined-multiline-static"
            //label="
            required
            placeholder="Kod Pocztowy"
            rows={4}
            //defaultValue={props.apartment.postalCode}
            name="postalCode"
            onChange={(event)=>props.handleChange(event, name)}
          />
          </Grid>
                  <Grid item xs={5}>
          <TextField
            fullWidth 
            sx={{ mr: 3}}
            id="outlined-multiline-static"
            placeholder="Miejscowość"
            //defaultValue={props.apartment.postalCode}
            name="postalCode"
            onChange={(event)=>props.handleChange(event, name)}
          />
          </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth 
            sx={{mr: 3}}
            id="outlined-multiline-static"
            placeholder="Ilość miejsc"
            
            //rows={4}
            //defaultValue={props.apartment.postalCode}
            name="postalCode"
            onChange={(event)=>props.handleChange(event, name)}
          />
          </Grid>
                  <Grid item xs={2}>
          <TextField
            fullWidth 
            sx={{ mr: 3}}
            id="outlined-multiline-static"
            placeholder="Cena"
            
            //rows={4}
            //defaultValue={props.apartment.postalCode}
            name="postalCode"
            onChange={(event)=>props.handleChange(event, name)}
          />

          </Grid>
          </Grid>
          </Box>

        <Box
        sx={{ mt: 3, mb: 3}}
        noValidate
        autoComplete="off"
        style={{ borderRadius: 5, backgroundColor: "#fefefe" }}
        >

        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', justifyContent: 'space-between'  }} >
          
          <ImageBox handleImage={handleImage} location={props.apartment} imageOrder="0"/>
          <ImageBox handleImage={handleImage} location={props.apartment} imageOrder="1"/>
          <ImageBox handleImage={handleImage} location={props.apartment} imageOrder="2"/>
          
        </Box>  
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgressWithLabel color="secondary" value={props.progress} />
        </Box>
      </Box>

  )
}

