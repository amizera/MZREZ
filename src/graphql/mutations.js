/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createApartment = /* GraphQL */ `
  mutation CreateApartment(
    $input: CreateApartmentInput!
    $condition: ModelApartmentConditionInput
  ) {
    createApartment(input: $input, condition: $condition) {
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
export const updateApartment = /* GraphQL */ `
  mutation UpdateApartment(
    $input: UpdateApartmentInput!
    $condition: ModelApartmentConditionInput
  ) {
    updateApartment(input: $input, condition: $condition) {
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
export const deleteApartment = /* GraphQL */ `
  mutation DeleteApartment(
    $input: DeleteApartmentInput!
    $condition: ModelApartmentConditionInput
  ) {
    deleteApartment(input: $input, condition: $condition) {
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
