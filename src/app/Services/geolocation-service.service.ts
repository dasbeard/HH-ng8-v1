import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ipapi } from '../Models/ipapi.model';
import { userGeoLocation } from '../Models/userLocation';


@Injectable({
  providedIn: 'root'
})
export class GeolocationServiceService {

  userLocation = <Ipapi>{};

  constructor( private http: HttpClient ) { }

  getUserLocation() {
    return this.http.get<Ipapi>('https://ipapi.co/json/');
  }


}
