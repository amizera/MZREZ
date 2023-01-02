
import React, { Component } from 'react';

import { Amplify, Storage, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { Container, darkScrollbar, Typography} from '@mui/material';
import Stack from '@mui/material/Stack';

import {data} from '../../data';
import {nanoid} from "nanoid";

import '@aws-amplify/ui-react/styles.css';
import './Lacalizations.css';

import awsExports from '../../aws-exports';
Amplify.configure(awsExports);

import { Box, Button } from '@mui/material';

import AddButton from '../../Components/AddButton/AddButton'
import UploadImage from '../../Components/UploadImage/UploadImage';

import { formFields } from '../../Config/AuthConfig';
import { AddAPhoto as AddAPhotoIcon, Description } from '@mui/icons-material';

import ListLocalizations from './ListLocalizations';
import AddLocationForm from './AddLocationForm';

const boxMargin = 1;

export default function Lacalizations() {

  const [location, setLocation] = React.useState({
    id: nanoid(),
    name: "Nazwij lokalizację",
    description: "Tutaj musi być opis lokalizacji",
    images: ["/static/images/11.jpg","/static/images/12.jpg","/static/images/13.jpg"]
  })
  
  const [locations, setLocations] = React.useState(
      () => JSON.parse(localStorage.getItem("locations")) || []
  )

  const [currentLocationId, setCurrentLocationId] = React.useState(
      (locations[0] && locations[0].id) || ""
  )

  React.useEffect(() => {
      localStorage.setItem("locations", JSON.stringify(locations))
  }, [locations])

  function updateLocation(key, value, index) {

    if (!index) {
      setLocation(prevLocation => ({
        ...prevLocation,
        [key]: value
      }))
      console.log("index is false")
    }
    else {
      setLocation(prevLocation => ({
        ...prevLocation,
        [key]: [...prevLocation.images, value]
      }))
      console.log("index true: " + index)
    }

    

    console.log("index: " + index + " key: " + key + " value: " + value)
    console.log(location)
  }

  function addLocation(location) {
    // Put the most recently-modified note at the top
    setLocations(prevLocations => [location, ...prevLocations])
    console.log("vvv tmp loc vvv")
    console.log(location)
    console.log("AAA tmp loc AAA")
  }

  function deleteLocation(event, locationId) {
    event.stopPropagation()
    setLocations(oldLocation => oldLocation.filter(location => location.id !== locationId))
    console.log("locationID: " + locationId )
  }

  function findCurrentLocation() {
    return locations.find(locations => {
        return locations.id === currentLocationId
    }) || locations[0]
  }


  const displayLocations = locations.map(location => (
    <ListLocalizations 
      key={location.id} 
      id={location.id}
      name={location.name} 
      description={location.description} 
      cover={location.images[0]}
      deleteLocation={deleteLocation}
      setCurrentLocationId={setCurrentLocationId}
    />
  ))

  return (
    <Authenticator formFields={formFields} >
    {({ signOut, user }) => (
      <Stack spacing={2}>
        <Container sx={{mt: 4}}>
          {displayLocations}
        </Container>

        <Container sx={{minWidth: 380}}>
          <AddLocationForm 
          locations={locations}
          location={location}
          addLocation={addLocation}
          updateLocation={updateLocation}
          //currentLocation={findCurrentLocation()}
          

          //setCurrentLocationId={setCurrentLocationId}
          />
        </Container>
      </Stack>
    )}
    </Authenticator>
  );

}
