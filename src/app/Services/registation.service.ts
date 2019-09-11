import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { User } from '../Models/user';


@Injectable({
  providedIn: 'root'
})
export class RegistationService {
  newUser:User;

  constructor() { }

  startNewUser(data:User){
    this.newUser = data;
    // console.log('newUser', this.newUser);
  }

  buildUserLocation(data, latLng) {
    this.newUser.fullAddress = data.formatted_address;
    this.newUser.phone = data.formatted_phone_number;
    this.newUser.website = data.website;
    this.newUser.latLng = latLng;
    
    console.log(this.newUser);
    
    
  }


}
