/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getApartment = /* GraphQL */ `
  query GetApartment($id: ID!) {
    getApartment(id: $id) {
      id
      name
      description
      street
      streetNo
      postalCode
      city
      apartmentNo
      price
      capacity
      images
      createdAt
      updatedAt
    }
  }
`;
export const listApartments = /* GraphQL */ `
  query ListApartments(
    $filter: ModelApartmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApartments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        street
        streetNo
        postalCode
        city
        apartmentNo
        price
        capacity
        images
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
