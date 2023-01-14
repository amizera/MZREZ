import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

import { API, graphqlOperation } from 'aws-amplify';
import { createApartment, updateApartment, deleteApartment } from './graphql/mutations';

const apartment = {
    id: nanoid(),
    name: "Nazwij lokalizację",
    description: "Tutaj musi być opis lokalizacji",
    images: [{ imgFilname: "11.jpg", imgFile: "/static/images/11.jpg"}, { imgFilname: "12.jpg", imgFile: "/static/images/12.jpg"},{ imgFilname: "13.jpg", imgFile: "/static/images/13.jpg"}]
  }

await API.graphql(graphqlOperation(createApartment, {input: apartment}));
