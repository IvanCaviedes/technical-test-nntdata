import { Country } from '@ntt-data/services/country/country.types';

export interface Note {
  id: string;
  titulo: string;
  description: string;
  country: string;
  color: string;
}

export interface NotewithCountry {
  id: string;
  titulo: string;
  description: string;
  country: Country;
  color: string;
}
