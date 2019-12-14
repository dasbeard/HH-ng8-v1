import { Injectable, Input } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../Models/user";
// import { AngularFireStorage } from "@angular/fire/storage";
// import { AngularFirestoreDocument } from '@angular/fire/firestore';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RegistationService {
  newUser: User;
  newUserAfsDoc: AngularFirestoreDocument<User>;
  userAfsDoc: AngularFirestoreDocument<User>;
  updateUser: AngularFirestoreDocument<User>;
  uploadPercent: Observable<number>;

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}




  // startNewUser(newUserData: User) {
  //   console.log(newUserData);

    // this.afs.collection<User>(`users`).doc(`${newUserData.uid}`).set({
      
    //   uid: newUserData.uid,
    //   email: newUserData.email,
    //   organization: newUserData.organization,
    //   registering: true,
    // });




    
    // this.newUser = data;
    // this.newUser.registering = true;
    // localStorage.setItem("user", JSON.stringify(this.newUser));

    // this.router.navigateByUrl("/Register");
  // }



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
    this.newUser.photoName = data.photoName;
    this.newUser.contactEmail = data.contactEmail;
    this.newUser.about = data.about;

    console.log(this.newUser);
    

    localStorage.setItem("user", JSON.stringify(this.newUser));

    // this.saveToDatabase(this.newUser)

    this.router.navigate(["/Register/Services"]);
  }

  addUserServices(services, otherServices, bedCount) {
    this.newUser = JSON.parse(localStorage.getItem("user"));
    // console.log(services, otherServices, bedCount);

    if (!services.beds) {
      bedCount = 0;
    }

    this.newUser.services = services;
    this.newUser.otherServices = otherServices;
    this.newUser.bedCount = bedCount;

    console.log(this.newUser);

    localStorage.setItem("user", JSON.stringify(this.newUser));
    // this.saveToDatabase(this.newUser);
    this.router.navigate(["/Register/Hours"]);
  }

  addUserHours(identifier, data, user) {
    this.newUser = user;

    if (identifier == "hoursOfOp") {
      this.newUser.hoursOfOperation = data;
    }
    if (identifier == "servingFood") {
      this.newUser.hoursServingFood = data;
    }

    this.newUser.lastUpdated = Date.now();
    this.newUser.registering = false;

    localStorage.setItem("user", JSON.stringify(this.newUser));

    this.saveToDatabase(this.newUser);
    this.router.navigate([`/OrgAdmin/${this.newUser.uid}`]);
  }


    //  -~-~-~-~-~-~-~-~ Update User -~-~-~-~-~-~-~-~

  updateAddress(locationResults, latLng, oldData: User) {
    let userToUpdate: User = oldData;

    // update data
    userToUpdate.fullAddress = locationResults.formatted_address;
    userToUpdate.latLng = latLng;

    // update user in Firebase
    this.userAfsDoc = this.afs.doc<User>(`users/${oldData.uid}`);
    this.userAfsDoc.update(userToUpdate);

    // update user in localStorage
    localStorage.setItem("user", JSON.stringify(userToUpdate));
  }

  updateProfile(oldData, newData) {
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

  updateUserHours(user: User, identifier, newHours) {
    let updatedUser: User = user;

    if (identifier === "hoursOfOperation") {
      updatedUser.hoursOfOperation = newHours;
    }

    if (identifier === "hoursServingFood") {
      updatedUser.hoursServingFood = newHours;
    }

    // console.log(updatedUser);

    updatedUser.lastUpdated = Date.now();

    this.updateUser = this.afs.doc<User>(`users/${user.uid}`);
    this.updateUser.update(updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));
  }

  updateBedsAvailable(user: User, status: boolean, bedCount: number) {
    let updatedData = user;
    updatedData.services.beds = status;
    updatedData.bedCount = bedCount;

    this.updateUser = this.afs.doc<User>(`users/${user.uid}`);
    this.updateUser.update(updatedData);
    localStorage.setItem("user", JSON.stringify(updatedData));
  }

  updateServesFood(user: User, value: boolean) {
    let updatedData = user;

    updatedData.services.servesFood = value;
    updatedData.lastUpdated = Date.now();

    this.updateUser = this.afs.doc<User>(`users/${user.uid}`);
    this.updateUser.update(updatedData);

    localStorage.setItem("user", JSON.stringify(updatedData));
  }



  //  -~-~-~-~-~-~-~-~ Save To Database -~-~-~-~-~-~-~-~
  saveToDatabase(newUserData) {
    this.afs.collection<User>('users/').doc(`${newUserData.uid}`).set({
      uid: newUserData.uid,
      email: newUserData.email,
      organization: newUserData.organization,
    });

    this.newUserAfsDoc = this.afs.doc<User>(`users/${newUserData.uid}`);
    this.newUserAfsDoc.update(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  }




  //  -~-~-~-~-~-~-~-~ Photo Upload -~-~-~-~-~-~-~-~

  updatePhotoName(uid: string, input: any) {
    // console.log(uid, input);
    this.updateUser = this.afs.doc<User>(`users/${uid}`);

    let tempPhotoName: string;

    if (input === "shelter") {
      tempPhotoName = "Shelter.jpg";
    } else if (input === "church") {
      tempPhotoName = "Church.jpg";
    } else {
      let extension = this.getImageExtension(input);
      tempPhotoName = `${uid}.${extension}`;
      this.uploadImage(uid, extension, input);
    }

    let dataToUpdate = { photoName: tempPhotoName };

    this.updateUser.update(dataToUpdate).catch(error => console.log(error));
  }

  getImageExtension(imageName) {
    var [name, extension] = imageName.name
      .split(".")
      .reduce(
        (acc, val, i, arr) =>
          i == arr.length - 1
            ? [acc[0].substring(1), val]
            : [[acc[0], val].join(".")],
        []
      );

    return extension;
  }


  uploadNewImage(uid: string, input:any) {  
    let extension = this.getImageExtension(input);
    
    this.uploadImage(uid, extension, input);
  }


  uploadImage(uid: string, extension: string, photo: any) {
    // console.log("Uploading Image");

    const fileName = `${uid}.${extension}`;

    const filePath = `userImages/${fileName}`;
    // const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, photo);

    this.uploadPercent = task.percentageChanges();
  }
}
