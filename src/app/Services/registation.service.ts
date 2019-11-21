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
  userAfsDoc: AngularFirestoreDocument<User>;
  updateUser: AngularFirestoreDocument<User>;

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

    // this.saveToDatabase(this.newUser)
    
    this.router.navigate(["/Register/Services"]);
  }



  addUserServices(services, otherServices, bedCount) {
    this.newUser = JSON.parse(localStorage.getItem("user"));
    // console.log(services, otherServices, bedCount);
    
    if( !services.beds ) {
      bedCount = 0;
    }

    this.newUser.services = services;
    this.newUser.otherServices = otherServices;
    this.newUser.bedCount = bedCount;

    // console.log(this.newUser);
    
    localStorage.setItem("user", JSON.stringify(this.newUser));
    this.saveToDatabase(this.newUser)
    this.router.navigate(["/Register/Hours"])
    
  }


  updateBedsAvailable(user: User, status: boolean, bedCount: number){
    let updatedData = user;
    updatedData.services.beds = status;
    updatedData.bedCount = bedCount;

    this.updateUser = this.afs.doc<User>(`users/${user.uid}`);
    this.updateUser.update(updatedData);
    localStorage.setItem("user", JSON.stringify(updatedData));
    
  }


  updateServesFood(user: User, value: boolean){
    let updatedData = user;

    updatedData.services.servesFood = value;
    updatedData.lastUpdated = Date.now();

    this.updateUser = this.afs.doc<User>(`users/${user.uid}`);
    this.updateUser.update(updatedData);

    localStorage.setItem("user", JSON.stringify(updatedData));

  }


  addUserHours(identifier, data, user){
      this.newUser = user;

    if(identifier == 'hoursOfOp'){
      this.newUser.hoursOfOperation = data;
    }
    if(identifier == 'servingFood'){
      this.newUser.hoursServingFood = data;
    }

    this.newUser.lastUpdated = Date.now();
    this.newUser.registering = false;
    
    localStorage.setItem("user", JSON.stringify(this.newUser));

    this.saveToDatabase(this.newUser);
    this.router.navigate([`/OrgAdmin/${this.newUser.uid}`]);
    
  }


  updateAddress(locationResults, latLng, oldData: User) {
    let userToUpdate:User = oldData;

    // update data
    userToUpdate.fullAddress = locationResults.formatted_address;
    userToUpdate.latLng = latLng;
    
    // update user in Firebase
    this.userAfsDoc = this.afs.doc<User>(`users/${oldData.uid}`);
    this.userAfsDoc.update(userToUpdate);

    // update user in localStorage
    localStorage.setItem("user", JSON.stringify(userToUpdate));
  }


  updateProfile(oldData, newData){
    let newProfile: User = oldData;

    // update data
    newProfile.organization = newData.organization;
    newProfile.website = newData.website;
    newProfile.phone = newData.phone;
    newProfile.contactEmail = newData.contactEmail;
    newProfile.about = newData.about;
    newProfile.otherServices = newData.otherServices;
    
    newProfile.services.beds = newData.beds;
    newProfile.services.childcare = newData.childcare;
    newProfile.services.education = newData.education;
    newProfile.services.interviewPrep = newData.interviewPrep;
    newProfile.services.jobPlacement = newData.jobPlacement;
    newProfile.services.donations = newData.donations;
    newProfile.services.servesFood = newData.servesFood;
    
    // console.log('Updated', newProfile);
    // update user in Firebase
    this.userAfsDoc = this.afs.doc<User>(`users/${oldData.uid}`);
    this.userAfsDoc.update(newProfile);


    // update user in localStorage
    localStorage.setItem("user", JSON.stringify(newProfile));
  }

  saveToDatabase(data){
    this.newUserAfsDoc = this.afs.doc<User>(`users/${data.uid}`);
    this.newUserAfsDoc.update(data);

    localStorage.setItem("user", JSON.stringify(this.newUser));
    
    // console.log('Data saved to firebase');
  }



  updateUserHours(user: User, identifier, newHours){
    let updatedUser: User = user;

      if( identifier === 'hoursOfOperation') {
        updatedUser.hoursOfOperation = newHours;
      }

      if( identifier === 'hoursServingFood') {
        updatedUser.hoursServingFood = newHours;
      }

      // console.log(updatedUser);

      updatedUser.lastUpdated = Date.now();

      this.updateUser = this.afs.doc<User>(`users/${user.uid}`);
      this.updateUser.update(updatedUser)
 
      localStorage.setItem("user", JSON.stringify(updatedUser)); 
}



}
