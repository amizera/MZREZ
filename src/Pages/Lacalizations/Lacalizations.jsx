
import React, { Component } from 'react';

import { Amplify, Storage, Auth, API } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { Container, darkScrollbar, Typography} from '@mui/material';
import Stack from '@mui/material/Stack';

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

var apartamentToDel = ''
const boxMargin = 1;
const apartmenty = await API.graphql({ query: queries.apartments });
console.log(apartmenty)

export default function Lacalizations() {

  const [apartments, setApartments] = React.useState(
    //apartmenty.data.listApartments.items || []
  )

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

  React.useEffect(() => {
    async function getApartments() {
      const res = await API.graphql({ query: queries.apartments })
      console.log(res)
      //const data = res.data.listApartments.items
      //setApartments(data)
    }
    getApartments()
  }, [])

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
    const tmpApartments = await API.graphql({ query: queries.apartments });
    setApartments(tmpApartments.data.listApartments.items || [])
  }

  const listApartments =  apartments.map(apart => ( 
    <ListLocalizations 
    key={apart.id} 
    id={apart.id}
    name={apart.name} 
    description={apart.description} 
    cover={apart.image[0]}
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
        </Container>

        <Container sx={{minWidth: 380}}>
          <AddLocationForm 
          handleAddApartments={handleAddApartments}
          />
        </Container>
      </Stack>
    )}
    </Authenticator>
  );

}
