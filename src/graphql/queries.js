/* eslint-disable */
// this is an auto generated file. This will be overwritten
/*
export const apartments = /* GraphQL  `
  query Apartments {
    apartments {
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
*/
export const apartment = /* GraphQL */ `
  query Apartment($id: ID!) {
    apartment(id: $id) {
      id
      name
      description
      street
      streetNo
      apartmentNo
      price
      capacity
      image
    }
  }
`;
export const reservations = /* GraphQL */ `
  query Reservations {
    reservations {
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
export const reservation = /* GraphQL */ `
  query Reservation($id: ID!) {
    reservation(id: $id) {
      id
      apartment {
        id
        apartmentNo
        capacity
        description
        id
        image
        name
        price
        street
        streetNo
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
export const guests = /* GraphQL */ `
  query Guests {
    guests {
      id
      name
      email
      phone
    }
  }
`;
export const guest = /* GraphQL */ `
  query Guest($id: ID!) {
    guest(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export const apartments = /* GraphQL */ `
query apartments {
  listApartments {
    items {
      apartmentNo
      capacity
      description
      id
      image
      name
      price
      street
      streetNo
    }
  }
}
`;

export const deleteApartment = /* GraphQL */ `
query deleteApartment{
  deleteApartment{
    id
  }
}
`;