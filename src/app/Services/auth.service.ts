import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { CreateUser, User } from "./../Models/user";
import { RegistationService } from "./registation.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<User>;
  newUserAfsDoc: AngularFirestoreDocument<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private regService: RegistationService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }



  async createUser(user: CreateUser) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {    
          let newUser = {
            uid: data.user.uid, 
            email: user.email, 
            organization: user.organization 
          };
        
          // console.log(newUser);
        
        this.regService.startNewUser(newUser);
      });
  }



  // async createUser(user: CreateUser) {
  //   this.afAuth.auth
  //     .createUserWithEmailAndPassword(user.email, user.password)
  //     .then(data => {
  //       const uid = data.user.uid;

  //       this.afs
  //         .collection<CreateUser>(`users`)
  //         .doc(uid)
  //         .set({
  //           email: user.email,
  //           organization: user.organization,
  //           uid: uid
  //         });

  //       const sendToRegService = {
  //         email: user.email,
  //         organization: user.organization,
  //         uid: uid
  //       };

  //       this.regService.startNewUser(sendToRegService);
  //     });
  // }

  async signIn(user: CreateUser) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );

    this.newUserAfsDoc = this.afs.doc(`users/${credential.user.uid}`);
    this.newUserAfsDoc.valueChanges().subscribe(user => {
      // console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
    });

    this.router.navigate([`/OrgAdmin/${credential.user.uid}`]);

    // return credential.user;
    // return this.updateUserData(credential.user);
  }


  async signOut() {
    await this.afAuth.auth.signOut();
    // ! Maybe this should be session not localstorage
    localStorage.removeItem("user");
    return this.router.navigate([""]);
  }
  
  // !! Need to fix issue when deleting user - may need to logout and then re-login first
  deleteUser(user: User) {
    console.log('test');
    
    this.afAuth.auth.currentUser.delete().catch(error => {
      console.log('Error');
      console.log(error);
    });
      this.afs.doc<User>(`users/${user.uid}`).delete();
    
      localStorage.removeItem("user");
    // this.router.navigate([""]);
  }
}

