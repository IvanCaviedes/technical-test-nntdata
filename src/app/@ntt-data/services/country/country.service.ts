import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  throwError,
} from 'rxjs';
import { Country } from './country.types';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private _countrys: BehaviorSubject<Country[] | null> = new BehaviorSubject<
    Country[] | null
  >(null);

  private BaseUrl: string =
    'https://restcountries.com/v3.1/all?fields=name,flags';

  constructor(private _httpClient: HttpClient) {
    this.fetchCountries();
  }

  private fetchCountries(): void {
    this._httpClient
      .get<Country[]>(this.BaseUrl)
      .subscribe((data: Country[]) => {
        this._countrys.next(data);
      });
  }

  getCountries(): Observable<Country[] | null> {
    return this._countrys.asObservable();
  }

  searchCountries(query: string): Country[] {
    const countries = this._countrys.getValue() ?? [];

    const matchingCountries: Country[] = [];

    for (const country of countries) {
      const countryName = country.name.common.toLowerCase();
      const queryLowerCase = query.toLowerCase();

      if (countryName.startsWith(queryLowerCase)) {
        matchingCountries.push(country);
      }
    }
    return matchingCountries;
  }
}
