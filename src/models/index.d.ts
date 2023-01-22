import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerApartmentConnection = {
  readonly apartments?: (Apartment | null)[] | null;
  readonly nextToken?: string | null;
}

type LazyApartmentConnection = {
  readonly apartments?: (Apartment | null)[] | null;
  readonly nextToken?: string | null;
}

export declare type ApartmentConnection = LazyLoading extends LazyLoadingDisabled ? EagerApartmentConnection : LazyApartmentConnection

export declare const ApartmentConnection: (new (init: ModelInit<ApartmentConnection>) => ApartmentConnection)

type EagerApartment = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly street: string;
  readonly streetNo: number;
  readonly postalCode?: string | null;
  readonly city: string;
  readonly apartmentNo?: number | null;
  readonly price?: number | null;
  readonly capacity?: number | null;
  readonly image?: (string | null)[] | null;
}

type LazyApartment = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly street: string;
  readonly streetNo: number;
  readonly postalCode?: string | null;
  readonly city: string;
  readonly apartmentNo?: number | null;
  readonly price?: number | null;
  readonly capacity?: number | null;
  readonly image?: (string | null)[] | null;
}

export declare type Apartment = LazyLoading extends LazyLoadingDisabled ? EagerApartment : LazyApartment

export declare const Apartment: (new (init: ModelInit<Apartment>) => Apartment)

