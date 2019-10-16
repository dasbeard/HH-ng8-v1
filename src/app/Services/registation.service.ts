import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../Models/user";
// import { AngularFireStorage } from "@angular/fire/storage";
// import { AngularFirestoreDocument } from '@angular/fire/firestore';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class RegistationService {
  newUser: User;
  newUserAfsDoc: AngularFirestoreDocument<User>;

  constructor(private router: Router, private afs: AngularFirestore) {}

  startNewUser(data: User) {

    this.newUser = data;
    this.newUser.registering = true;
    localStorage.setItem("user", JSON.stringify(this.newUser));

    this.router.navigateByUrl("/Register");
  }

  buildUserLocation(data, latLng) {
    this.newUser = JSON.parse(localStorage.getItem("user"));

    this.newUser.fullAddress = data.formatted_address;
    this.newUser.phone = data.formatted_phone_number;
    this.newUser.website = data.website;
    this.newUser.latLng = latLng;

    // console.log(this.newUser);
    // ! Maybe this should be session not localstorage
    localStorage.setItem("user", JSON.stringify(this.newUser));

    this.router.navigate(["/Register/MoreInfo"]);
  }

  addUserInfo(data) {
    this.newUser = JSON.parse(localStorage.getItem("user"));

    this.newUser.website = data.website;
    this.newUser.phone = data.phone;
    this.newUser.contactEmail = data.contactEmail;
    this.newUser.about = data.about;

    localStorage.setItem("user", JSON.stringify(this.newUser));

    this.saveToDatabase(this.newUser)
    
    this.router.navigate(["/Register/Services"]);
  }


  addUserServices(services, otherServices) {
    this.newUser = JSON.parse(localStorage.getItem("user"));
    // console.log(services, otherServices);
    
    this.newUser.services = services;
    this.newUser.otherServices = otherServices;

    // console.log(this.newUser);
    
    localStorage.setItem("user", JSON.stringify(this.newUser));
    this.saveToDatabase(this.newUser)
    this.router.navigate(["/Register/Hours"])
    
  }


  addUserHours(identifier, data, user){
      this.newUser = user;

    if(identifier == 'hoursOfOp'){
      // console.log('Hours of Operation', data);
      this.newUser.hoursOfOperation = data;
      // console.log(this.newUser);
      
    }
    if(identifier == 'servingFood'){
      // console.log('Hours Serving Food', data);
      this.newUser.hoursServingFood = data;
      // console.log(this.newUser);
    }

    // console.log(this.newUser);
    

    this.newUser.registering = false;
    
    localStorage.setItem("user", JSON.stringify(this.newUser));

    this.saveToDatabase(this.newUser);
    this.router.navigate([`/OrgAdmin/${this.newUser.uid}`]);
    
  }


  saveToDatabase(data){
    this.newUserAfsDoc = this.afs.doc(`users/${data.uid}`);
    this.newUserAfsDoc.update(data);

    localStorage.setItem("user", JSON.stringify(this.newUser));
    
    // console.log('Data saved to firebase');
  }



}
