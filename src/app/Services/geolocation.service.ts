import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ipapi } from '../Models/ipapi.model';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  userLocation:Ipapi;

  constructor( private http: HttpClient ) { }

  getUserLocation() {
    return this.http.get<Ipapi>('https://ipapi.co/json/');
  }


}

