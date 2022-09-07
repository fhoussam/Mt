import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_SETTINGS } from '../models/APP_SETTINGS';

@Injectable({
  providedIn: 'root'
})
export class InitLoadService {

  constructor(private http: HttpClient) { }

  getSettings(): Promise<any> {
    const promise = Promise.all([
      this.http.get<string[]>('api/MetaData/Cities').toPromise(),
      this.http.get<string[]>('api/MetaData/Countries').toPromise(),
    ]).then(settings => {
      console.log('init success');
      console.log(settings[0]);
      console.log(settings[1]);
      APP_SETTINGS.cities = settings[0];
      APP_SETTINGS.countries = settings[1];
      APP_SETTINGS.cities.unshift("");
      APP_SETTINGS.countries.unshift("");
      return settings;
    }).catch(error => console.log(error));

    return promise;
  }
}
