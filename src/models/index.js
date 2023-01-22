// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ApartmentConnection, Apartment } = initSchema(schema);

export {
  ApartmentConnection,
  Apartment
};