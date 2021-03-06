import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_SETTINGS } from '../models/APP_SETTINGS';

@Injectable({
  providedIn: 'root'
})
export class InitLoadService {

    constructor(private http:HttpClient) { }

    getSettings(): Promise<any> {
        const promise = Promise.all([
            this.http.get<string[]>('https://localhost:5002/MetaData/Cities').toPromise(),
            this.http.get<string[]>('https://localhost:5002/MetaData/Countries').toPromise(),
        ]).then(settings =>
        {
            APP_SETTINGS.cities = settings[0];
            APP_SETTINGS.countries = settings[1];
            console.log(settings);
            return settings
        });

        return promise;
    }
}
