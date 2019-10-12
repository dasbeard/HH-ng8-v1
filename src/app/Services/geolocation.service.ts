import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Ipapi } from "../Models/ipapi.model";
import { LatLngPosition } from "../Models/user";
import { Observable } from "rxjs";



@Injectable({
  providedIn: "root"
})
export class GeolocationService {
  userIpapiLocation: Ipapi;

  constructor(private http: HttpClient) {}

  getUserLocation() {
    // console.log('Running IPapi');

    return this.http.get<Ipapi>("https://ipapi.co/json/");
  }

}
