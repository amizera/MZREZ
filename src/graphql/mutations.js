/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createApartment = /* GraphQL */ `
mutation CreateApartment($input: CreateApartmentInput!) {
  createApartment(input: $input) {
    id
    name
    description
    location
    price
    capacity
    image
  }
}
`

export const deleteApartment = /* GraphQL */ `
mutation DeleteApartment($input: DeleteApartmentInput!) {
  deleteApartment(input: $input) {
    id
    name
    description
    location
    price
    capacity
    image
  }
}
`

export const updateApartment = /* GraphQL */ `
  mutation UpdateApartment(
    $id: ID!
    $name: String
    $description: String
    $location: String
    $price: Float
    $capacity: Int
    $image: String
  ) {
    updateApartment(
      id: $id
      name: $name
      description: $description
      location: $location
      price: $price
      capacity: $capacity
      image: $image
    ) {
      id
      name
      description
      location
      price
      capacity
      image
    }
  }
`;


export const createReservation = /* GraphQL */ `
  mutation CreateReservation(
    $apartmentId: ID!
    $guestId: ID!
    $startDate: String!
    $endDate: String!
  ) {
    createReservation(
      apartmentId: $apartmentId
      guestId: $guestId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      apartment {
        id
        name
        description
        location
        price
        capacity
        image
      }
      guest {
        id
        name
        email
        phone
      }
      startDate
      endDate
    }
  }
`;
export const updateReservation = /* GraphQL */ `
  mutation UpdateReservation(
    $id: ID!
    $apartmentId: ID
    $guestId: ID
    $startDate: String
    $endDate: String
  ) {
    updateReservation(
      id: $id
      apartmentId: $apartmentId
      guestId: $guestId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      apartment {
        id
        name
        description
        location
        price
        capacity
        image
      }
      guest {
        id
        name
        email
        phone
      }
      startDate
      endDate
    }
  }
`;
export const deleteReservation = /* GraphQL */ `
  mutation DeleteReservation($id: ID!) {
    deleteReservation(id: $id) {
      id
      apartment {
        id
        name
        description
        location
        price
        capacity
        image
      }
      guest {
        id
        name
        email
        phone
      }
      startDate
      endDate
    }
  }
`;
export const createGuest = /* GraphQL */ `
  mutation CreateGuest($name: String!, $email: String!, $phone: String!) {
    createGuest(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;
export const updateGuest = /* GraphQL */ `
  mutation UpdateGuest(
    $id: ID!
    $name: String
    $email: String
    $phone: String
  ) {
    updateGuest(id: $id, name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;
export const deleteGuest = /* GraphQL */ `
  mutation DeleteGuest($id: ID!) {
    deleteGuest(id: $id) {
      id
      name
      email
      phone
    }
  }
`;
