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
    localStorage.setItem("user", JSON.stringify(this.newUser));
    // console.log('newUser', this.newUser);
  }

  buildUserLocation(data, latLng) {
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

    this.newUserAfsDoc = this.afs.doc(`users/${this.newUser.uid}`);
    this.newUserAfsDoc.update(this.newUser);

    this.router.navigate(["/Register/Services"]);
  }


  addUserServices(data) {
    this.newUser = JSON.parse(localStorage.getItem("user"));

    // this.newUser.

  }

}
