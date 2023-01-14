
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

import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

export default function AddLocationForm(props) {

  
  const [apartment, setApartment] = React.useState(
    {
      id: "",
      name: "",
      description: "",
      street: "",
      streetNo: "",
      apartmentNo: "",
      price: "",
      capacity: "",
      images: [{ imgFilname: "", imgFile: ""},{ imgFilname: "", imgFile: ""},{ imgFilname: "", imgFile: ""}]
    }
  )

  function handleEditAparmet(key, value, filename, index) {
    if (!index) {
      setApartment(prevApartment => ({ ...prevApartment, [key]: value }));
    } else {
      setApartment(prevApartment => ({ ...prevApartment, [key]: prevApartment[key].map((obj, imagesIndex) =>  imagesIndex == index ?  {imgFilname: filename, imgFile: value} : obj) }))
    }
  }

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  const boxMargin = 2
  const tmp_path = ""

  const id = React.useId(); 
  const [file, setFile] = React.useState();
  const [uploading, setUploading] = React.useState(false);
  const [imgToUpload, setImgToUpload] = React.useState(0);
  const [imgUploaded, setImgUploaded] = React.useState(0);
  var img = null

  function getCurrentUsername() {
      return new Promise((resolve, reject) => {
          Auth.currentAuthenticatedUser()
          .then(user => {
              if (user.username) {
                  resolve(user.username)
              } else {
                  resolve(null)
              }
          })
          .catch(err => {
              console.log(err)
              resolve(null)
          });
      })
  }

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

  function imgToBlobAsync(img, canvas) {
      return new Promise((resolve, reject) => {
          const ctxMain = canvas.getContext('2d');
          ctxMain.drawImage(img, 0, 0, canvas.width, canvas.height);
          ctxMain.canvas.toBlob(async (blob) => {
              resolve(blob)
          }, 'image/*');
      })
  }

  function createCanvas(img, maxSize) {
      const canvas = document.createElement('canvas');
      if (img.width > img.height) {
      const widthMain = maxSize;
      const scaleFactorMain = widthMain / img.width;
      canvas.width = widthMain;
      canvas.height = img.height * scaleFactorMain;
      } else {
      const heightMain = maxSize;
      const scaleFactorMain = heightMain / img.height;
      canvas.width = img.width * scaleFactorMain;
      canvas.height = heightMain;
      }
      return canvas
  }

  async function pushImgToS3(uri, filename) {
    if (uri === null) return
    await Storage.put(filename, uri, {
        level: 'protected',
        contentType: 'image/*',
        progressCallback(progress) {
            console.log(`Uploaded: ${progress.loaded}/${progress.total} or % ${(progress.loaded/progress.total)*100}`);
        }
    })
        .then(result => console.log("result.key: " + result.key))
        .catch(err => console.log(err));
}

  async function handleUpload() {
    //event.persist();
    // Check there is some files to upload
    if (!apartment || !apartment.images) return
    
    const filesLength = apartment.images.length;
    const username = await getCurrentUsername();
    
    setUploading(true)
    setImgToUpload(filesLength)
  
    // Loop through all selected files 
    for (let i = 0; i < filesLength; i++) {
        setImgUploaded(i+1)
        
        const file = apartment.images[i];
        
        const filename = file.imgFilname.toLowerCase().replace(/\.[^/.]+$/, "").replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const fileExtension = file.imgFilname.split('.').pop();
        // Define the image name
        const rootName = /* username + '/' +*/ filename + '-' + uuid();
        //let mainImgName = filename + '-' + uuid() + '.' + fileExtension;
        let mainImgName = rootName + '.' + fileExtension;
        let thumbnailImgName = rootName + '-thumbnail.' + fileExtension;
        
        // Read the image
        //const imgSrc = await this.readFileAsync(file);
        const img = await loadImgAsync(apartment.images[i].imgFile);

        // From the image and a canvas (for the resize), 
        // generate a blob to be uploaded
        const canvas = createCanvas(img, 1000);
        const imgBlob = await imgToBlobAsync(img, canvas);

        // Same with the thumbnail
        const canvasThumb = createCanvas(img, 100)
        const imgBlobThumb = await imgToBlobAsync(img, canvasThumb)
        
        // Create a file from the blob
        const fileMain = new File([imgBlob], filename, {
            type: 'image/*',
        lastModified: Date.now()
        })

        const fileThumb = new File([imgBlobThumb], filename, {
            type: 'image/*',
           lastModified: Date.now()
        });

        // Push the image to S3
        await pushImgToS3(fileThumb, thumbnailImgName)
        await pushImgToS3(fileMain, mainImgName)
        apartment.images[i].imgFilname = rootName
    }

    //const apartament2upload = {capacity: 4, description: apartment.description, image: [apartment.images[0].imgFilname, apartment.images[1].imgFilname, apartment.images[2].imgFilname]  , location: "zp", name: apartment.name, price: 1.5}
    props.handleAddApartments(apartment)

    setUploading(false)
    setImgToUpload(0)
    setImgToUpload(0)

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
    handleEditAparmet(name, imgSrc, filename, index)
      
  }

  function handleChange(event) {
    const {name, value} = event.target
    setApartment(prevApartment => ({ ...prevApartment, [name]: value }))
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
            defaultValue={apartment.name}
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
            required
            id="outlined-multiline-static"
            placeholder="Dodaj opis"
            multiline
            rows={7}
            defaultValue={apartment.description}
            name="description"
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth 
            sx={{ mr: 2 }}
            required
            id="outlined-multiline-static"
            //label="Ulica"
            placeholder="Ulica"
            //rows={4}
            defaultValue={apartment.street}
            name="street"
            onChange={handleChange}
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
            defaultValue={apartment.streetNo}
            name="streetNo"
            onChange={handleChange}
          />
          </Grid>
          <Grid item xs={2}>
          <TextField
            fullWidth 
            sx={{  }}
            id="outlined-multiline-static"
            //label="Numer Apartamentu"
            placeholder="Nr ap."
            //rows={4}
            defaultValue={apartment.locationNo}
            name="apartmentNo"
            onChange={handleChange}
          />
          </Grid>
          </Grid>
          </Box>

        <Box sx={{ flexGrow: 1, mt:2 }}>
        <Grid container spacing={2}>
        <Grid item xs={2}>

          <TextField
            fullWidth 
            sx={{ mr: 3}}
            id="outlined-multiline-static"
            //label="
            required
            placeholder="Kod Pocztowy"
            rows={4}
            defaultValue={apartment.postalCode}
            name="postalCode"
            onChange={handleChange}
          />
          </Grid>
                  <Grid item xs={4}>
          <TextField
            fullWidth 
            sx={{ mr: 3}}
            id="outlined-multiline-static"
            placeholder="Miejscowość"
            defaultValue={apartment.postalCode}
            name="postalCode"
            onChange={handleChange}
          />
          </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth 
            sx={{mr: 3}}
            id="outlined-multiline-static"
            placeholder="Ilość miejsc"
            
            //rows={4}
            defaultValue={apartment.postalCode}
            name="postalCode"
            onChange={handleChange}
          />
          </Grid>
                  <Grid item xs={2}>
          <TextField
            fullWidth 
            sx={{ mr: 3}}
            id="outlined-multiline-static"
            placeholder="Cena"
            
            //rows={4}
            defaultValue={apartment.postalCode}
            name="postalCode"
            onChange={handleChange}
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
          
          <ImageBox handleImage={handleImage} location={apartment} imageOrder="0"/>
          <ImageBox handleImage={handleImage} location={apartment} imageOrder="1"/>
          <ImageBox handleImage={handleImage} location={apartment} imageOrder="2"/>
          
        </Box>  
      </Box>

      <Box  style={{ borderRadius: 5,  padding: 10, marginTop: 20}} >
        <Button variant="contained"
          size="medium"
          color="secondary"
          component="span"
          onClick={handleUpload}
          disabled={uploading}
        >
          <Typography  variant="h6" >dodaj</Typography>
        </Button>
                  
      </Box>

    </Paper>
  )
}

