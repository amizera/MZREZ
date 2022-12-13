/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      login
      name
      surename
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        login
        name
        surename
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReservations = /* GraphQL */ `
  query GetReservations($id: ID!) {
    getReservations(id: $id) {
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
export const listReservations = /* GraphQL */ `
  query ListReservations(
    $filter: ModelReservationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getLocations = /* GraphQL */ `
  query GetLocations($id: ID!) {
    getLocations(id: $id) {
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
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $filter: ModelLocationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getImages = /* GraphQL */ `
  query GetImages($id: ID!) {
    getImages(id: $id) {
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
export const listImages = /* GraphQL */ `
  query ListImages(
    $id: ID
    $filter: ModelImagesFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listImages(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getImagesLocations = /* GraphQL */ `
  query GetImagesLocations($id: ID!) {
    getImagesLocations(id: $id) {
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
export const listImagesLocations = /* GraphQL */ `
  query ListImagesLocations(
    $filter: ModelImagesLocationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImagesLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        locationsId
        imagesId
        locations {
          id
          name
          description
          rules
          images
          createdAt
          updatedAt
        }
        images {
          id
          owner
          name
          description
          online
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const imagesLocationsByLocationsId = /* GraphQL */ `
  query ImagesLocationsByLocationsId(
    $locationsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelImagesLocationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    imagesLocationsByLocationsId(
      locationsId: $locationsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        locationsId
        imagesId
        locations {
          id
          name
          description
          rules
          images
          createdAt
          updatedAt
        }
        images {
          id
          owner
          name
          description
          online
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const imagesLocationsByImagesId = /* GraphQL */ `
  query ImagesLocationsByImagesId(
    $imagesId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelImagesLocationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    imagesLocationsByImagesId(
      imagesId: $imagesId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        locationsId
        imagesId
        locations {
          id
          name
          description
          rules
          images
          createdAt
          updatedAt
        }
        images {
          id
          owner
          name
          description
          online
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
