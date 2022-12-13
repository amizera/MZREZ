/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
      id
      login
      name
      surename
      createdAt
      updatedAt
    }
  }
`;
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
      id
      login
      name
      surename
      createdAt
      updatedAt
    }
  }
`;
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
      id
      login
      name
      surename
      createdAt
      updatedAt
    }
  }
`;
export const createReservations = /* GraphQL */ `
  mutation CreateReservations(
    $input: CreateReservationsInput!
    $condition: ModelReservationsConditionInput
  ) {
    createReservations(input: $input, condition: $condition) {
      id
      locationID
      userID
      startDate
      endDate
      notes
      Locations {
        id
        name
        description
        rules
        images
        imagess {
          nextToken
        }
        createdAt
        updatedAt
      }
      Users {
        id
        login
        name
        surename
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      reservationsLocationsId
      reservationsUsersId
    }
  }
`;
export const updateReservations = /* GraphQL */ `
  mutation UpdateReservations(
    $input: UpdateReservationsInput!
    $condition: ModelReservationsConditionInput
  ) {
    updateReservations(input: $input, condition: $condition) {
      id
      locationID
      userID
      startDate
      endDate
      notes
      Locations {
        id
        name
        description
        rules
        images
        imagess {
          nextToken
        }
        createdAt
        updatedAt
      }
      Users {
        id
        login
        name
        surename
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      reservationsLocationsId
      reservationsUsersId
    }
  }
`;
export const deleteReservations = /* GraphQL */ `
  mutation DeleteReservations(
    $input: DeleteReservationsInput!
    $condition: ModelReservationsConditionInput
  ) {
    deleteReservations(input: $input, condition: $condition) {
      id
      locationID
      userID
      startDate
      endDate
      notes
      Locations {
        id
        name
        description
        rules
        images
        imagess {
          nextToken
        }
        createdAt
        updatedAt
      }
      Users {
        id
        login
        name
        surename
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      reservationsLocationsId
      reservationsUsersId
    }
  }
`;
export const createLocations = /* GraphQL */ `
  mutation CreateLocations(
    $input: CreateLocationsInput!
    $condition: ModelLocationsConditionInput
  ) {
    createLocations(input: $input, condition: $condition) {
      id
      name
      description
      rules
      images
      imagess {
        items {
          id
          locationsId
          imagesId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateLocations = /* GraphQL */ `
  mutation UpdateLocations(
    $input: UpdateLocationsInput!
    $condition: ModelLocationsConditionInput
  ) {
    updateLocations(input: $input, condition: $condition) {
      id
      name
      description
      rules
      images
      imagess {
        items {
          id
          locationsId
          imagesId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteLocations = /* GraphQL */ `
  mutation DeleteLocations(
    $input: DeleteLocationsInput!
    $condition: ModelLocationsConditionInput
  ) {
    deleteLocations(input: $input, condition: $condition) {
      id
      name
      description
      rules
      images
      imagess {
        items {
          id
          locationsId
          imagesId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createImages = /* GraphQL */ `
  mutation CreateImages(
    $input: CreateImagesInput!
    $condition: ModelImagesConditionInput
  ) {
    createImages(input: $input, condition: $condition) {
      id
      owner
      name
      description
      online
      Locations {
        items {
          id
          locationsId
          imagesId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateImages = /* GraphQL */ `
  mutation UpdateImages(
    $input: UpdateImagesInput!
    $condition: ModelImagesConditionInput
  ) {
    updateImages(input: $input, condition: $condition) {
      id
      owner
      name
      description
      online
      Locations {
        items {
          id
          locationsId
          imagesId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteImages = /* GraphQL */ `
  mutation DeleteImages(
    $input: DeleteImagesInput!
    $condition: ModelImagesConditionInput
  ) {
    deleteImages(input: $input, condition: $condition) {
      id
      owner
      name
      description
      online
      Locations {
        items {
          id
          locationsId
          imagesId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createImagesLocations = /* GraphQL */ `
  mutation CreateImagesLocations(
    $input: CreateImagesLocationsInput!
    $condition: ModelImagesLocationsConditionInput
  ) {
    createImagesLocations(input: $input, condition: $condition) {
      id
      locationsId
      imagesId
      locations {
        id
        name
        description
        rules
        images
        imagess {
          nextToken
        }
        createdAt
        updatedAt
      }
      images {
        id
        owner
        name
        description
        online
        Locations {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateImagesLocations = /* GraphQL */ `
  mutation UpdateImagesLocations(
    $input: UpdateImagesLocationsInput!
    $condition: ModelImagesLocationsConditionInput
  ) {
    updateImagesLocations(input: $input, condition: $condition) {
      id
      locationsId
      imagesId
      locations {
        id
        name
        description
        rules
        images
        imagess {
          nextToken
        }
        createdAt
        updatedAt
      }
      images {
        id
        owner
        name
        description
        online
        Locations {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteImagesLocations = /* GraphQL */ `
  mutation DeleteImagesLocations(
    $input: DeleteImagesLocationsInput!
    $condition: ModelImagesLocationsConditionInput
  ) {
    deleteImagesLocations(input: $input, condition: $condition) {
      id
      locationsId
      imagesId
      locations {
        id
        name
        description
        rules
        images
        imagess {
          nextToken
        }
        createdAt
        updatedAt
      }
      images {
        id
        owner
        name
        description
        online
        Locations {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
