/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onCreateUsers(filter: $filter) {
      id
      login
      name
      surename
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onUpdateUsers(filter: $filter) {
      id
      login
      name
      surename
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers($filter: ModelSubscriptionUsersFilterInput) {
    onDeleteUsers(filter: $filter) {
      id
      login
      name
      surename
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReservations = /* GraphQL */ `
  subscription OnCreateReservations(
    $filter: ModelSubscriptionReservationsFilterInput
  ) {
    onCreateReservations(filter: $filter) {
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
export const onUpdateReservations = /* GraphQL */ `
  subscription OnUpdateReservations(
    $filter: ModelSubscriptionReservationsFilterInput
  ) {
    onUpdateReservations(filter: $filter) {
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
export const onDeleteReservations = /* GraphQL */ `
  subscription OnDeleteReservations(
    $filter: ModelSubscriptionReservationsFilterInput
  ) {
    onDeleteReservations(filter: $filter) {
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
export const onCreateLocations = /* GraphQL */ `
  subscription OnCreateLocations(
    $filter: ModelSubscriptionLocationsFilterInput
  ) {
    onCreateLocations(filter: $filter) {
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
export const onUpdateLocations = /* GraphQL */ `
  subscription OnUpdateLocations(
    $filter: ModelSubscriptionLocationsFilterInput
  ) {
    onUpdateLocations(filter: $filter) {
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
export const onDeleteLocations = /* GraphQL */ `
  subscription OnDeleteLocations(
    $filter: ModelSubscriptionLocationsFilterInput
  ) {
    onDeleteLocations(filter: $filter) {
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
export const onCreateImages = /* GraphQL */ `
  subscription OnCreateImages($filter: ModelSubscriptionImagesFilterInput) {
    onCreateImages(filter: $filter) {
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
export const onUpdateImages = /* GraphQL */ `
  subscription OnUpdateImages($filter: ModelSubscriptionImagesFilterInput) {
    onUpdateImages(filter: $filter) {
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
export const onDeleteImages = /* GraphQL */ `
  subscription OnDeleteImages($filter: ModelSubscriptionImagesFilterInput) {
    onDeleteImages(filter: $filter) {
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
export const onCreateImagesLocations = /* GraphQL */ `
  subscription OnCreateImagesLocations(
    $filter: ModelSubscriptionImagesLocationsFilterInput
  ) {
    onCreateImagesLocations(filter: $filter) {
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
export const onUpdateImagesLocations = /* GraphQL */ `
  subscription OnUpdateImagesLocations(
    $filter: ModelSubscriptionImagesLocationsFilterInput
  ) {
    onUpdateImagesLocations(filter: $filter) {
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
export const onDeleteImagesLocations = /* GraphQL */ `
  subscription OnDeleteImagesLocations(
    $filter: ModelSubscriptionImagesLocationsFilterInput
  ) {
    onDeleteImagesLocations(filter: $filter) {
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
