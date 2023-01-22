
import React, { Component } from 'react';

import { Amplify, Storage, Auth, API } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { Container, darkScrollbar, Typography} from '@mui/material';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import {nanoid} from "nanoid";

import '@aws-amplify/ui-react/styles.css';
import './Lacalizations.css';
import { graphqlOperation } from 'aws-amplify';
import awsExports from '../../aws-exports';
Amplify.configure(awsExports);

import { formFields } from '../../Config/AuthConfig';
import ListLocalizations from './ListLocalizations';
import AddLocationForm from './AddLocationForm';


import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

import { createApartment } from '../../graphql/mutations';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { v4 as uuid } from 'uuid';
var apartamentToDel = ''
const boxMargin = 1;
//const apartmenty = await API.graphql({ query: queries.listApartments });

export default function Lacalizations() {


  const [apartment, setApartment] = React.useState(
    {
      name: "",
      description: "",
      street: "",
      streetNo: "",
      apartmentNo: 3,
      postalCode: "",
      city: "",
      price: 0.0,
      capacity: 0,
      images: [{ imgFilname: "", imgFile: ""},{ imgFilname: "", imgFile: ""},{ imgFilname: "", imgFile: ""}]
    }
  )
  const [file, setFile] = React.useState();
  const [uploading, setUploading] = React.useState(false);
  const [imgToUpload, setImgToUpload] = React.useState(0);
  const [imgUploaded, setImgUploaded] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [apartments, setApartments] = React.useState(
   // apartmenty.data.listApartments|| []
   []
  )

  
  React.useEffect(() => {
    async function getApartments() {
      const res = await API.graphql({ query: queries.listApartments })
      const data = res.data.listApartments.items
      setApartments(data)
    }
    getApartments()
  }, [])

  function handleEditAparmet(key, value, filename, index) {
    if (!index) {
      setApartment(prevApartment => ({ ...prevApartment, [key]: value }));
    } else {
    //  setApartment(prevApartment => ({ ...prevApartment, [key]: prevApartment[key].map((obj, imagesIndex) =>  imagesIndex == index ?  {imgFilname: filename, imgFile: value} : obj) }))
    setApartment(prevApartment => ({ ...prevApartment, [key]: prevApartment[key].map((obj, imagesIndex) =>  imagesIndex == index ?  {imgFilname: filename, imgFile: value} : obj) }))
    }
  }

  function handleChange(event) {
    const {name, value} = event.target
    console.log(event)
    setApartment(prevApartment => ({ ...prevApartment, [name]: value }))
  }

  const handleAddApartments = async value => {
    const result = await API.graphql(graphqlOperation( createApartment, {input: value} ))
    setApartments(prevApartment => [...prevApartment, result.data.createApartment])
  }

  function handleDeleteApartments() {

  }

  function handleUpdateAparmets() {

  }

  function updateLocation(key, value, filename, index) {
    const indexToUpdate = index
    if (!index) {
      setLocation(prevApartment => ({
        ...prevApartment,
        [key]: value
      }))
    }
    else {
      const newState = location.images.map((obj, imagesIndex) => {
        //console.log(obj)
        // 👇️ if id equals replace object
        if (imagesIndex == indexToUpdate) {
         return { imgFilname: filename, imgFile: value}
        }
        return obj;
      })
      setLocation(prevApartment => ({
        ...prevApartment,
        [key]: newState
      })) 
    }
  }

const [currentApartmentsId, setCurrentApartmentsId] = React.useState(
    (apartments[0] && apartments[0].id) || ""
)

  function findCurrentLocation() {
    return locations.find(locations => {
        return locations.id === currentLocationId
    }) || locations[0]
  }

  async function deleteApartment(apartmentId) {
    const apartmentToDel = {id: apartmentId }
    const deleteApartment = await API.graphql({ query: mutations.deleteApartment, variables: {input: apartmentToDel} })
    const tmpApartments = await API.graphql({ query: queries.listApartments });
    setApartments(tmpApartments.data.listApartments.items || [])
  }

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
          //console.log(`Uploaded: ${progress.loaded}/${progress.total} or % ${(progress.loaded/progress.total)*100}`);
          setProgress((progress.loaded/progress.total)*100)
      }
  })
      .then(result => console.log("result.key: " + result.key))
      .catch(err => console.log(err));
}

async function handleUpload(apartment) {
  //event.persist();
  // Check there is some files to upload
  console.log(apartment)
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
      const canvasThumb = createCanvas(img, 200)
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
      if (!fileMain) {
        console.log("nic do uloadu")
      }
      else{
        await pushImgToS3(fileThumb, thumbnailImgName)
        await pushImgToS3(fileMain, mainImgName)
        apartment.images[i].imgFilname = mainImgName
      }

  }
  const apartament2upload = {
    name: apartment.name,
    description: apartment.description,
    street: apartment.street,
    streetNo: apartment.streetNo,
    apartmentNo: apartment.apartmentNo,
    postalCode: apartment.postalCode,
    city: apartment.city,
    price: apartment.price,
    capacity: apartment.capacity,
    images: [apartment.images[0].imgFilname, apartment.images[1].imgFilname, apartment.images[2].imgFilname] 
  }
  
  handleAddApartments(apartament2upload)

  setUploading(false)
  setImgToUpload(0)
  setImgToUpload(0)
  //setApartment()
  setProgress(0)
  setOpen(false)
}   


  const listApartments =  apartments.map(apart => ( 
    <ListLocalizations 
    key={apart.id} 
    id={apart.id}
    name={apart.name} 
    description={apart.description} 
    cover={apart.images[0]}
    deleteApartment={deleteApartment}
    
    
    //setCurrentApartmentsId={setCurrentApartmentsId}
    //locations={apartments}
  />
   )) 

  return (
    <Authenticator formFields={formFields} >
    {({ signOut, user }) => (
      <Stack spacing={2}>
        <Container sx={{mt: 4}}>
          {listApartments}

          <div>
            <Fab color="primary" aria-label="add" sx={{position: 'absolute', bottom: 16, right: 16}} onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Nowy apartament</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Wypełnij formularz i kliknij DODAJ
                </DialogContentText>
                <AddLocationForm 
                handleAddApartments={handleAddApartments}
                handleUpload={handleUpload}
                handleEditAparmet={handleEditAparmet}
                handleChange={handleChange}
                apartment={apartment}
                progress={progress}
                />
              </DialogContent>
              <DialogActions>
                <Button disabled={uploading} color="secondary" onClick={handleClose}>Anuluj</Button>
                <Button disabled={uploading} color="secondary" onClick={() => handleUpload(apartment)}>Dodaj</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Container>
      </Stack>
    )}
    </Authenticator>
  );

}
