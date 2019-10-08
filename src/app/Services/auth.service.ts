import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap, tap, take, map } from "rxjs/operators";

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
        const uid = data.user.uid;

        this.afs
          .collection<CreateUser>(`users`)
          .doc(uid)
          .set({
            email: user.email,
            organization: user.organization,
            uid: uid
          });

        const sendToRegService = {
          email: user.email,
          organization: user.organization,
          uid: uid
        };

        this.regService.startNewUser(sendToRegService);
      });
  }

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

  // private updateUserData(user) {
  //   const userRef: AngularFirestoreDocument<User> = this.afs.doc(
  //     `users/${user.uid}`);

  //   const data = {
  //     uid: user.uid,
  //     email: user.email
  //   };

  //   this.router.navigate(["/OrgAdmin"]);

  //   return userRef.set(data, { merge: true });
  // }

  async signOut() {
    await this.afAuth.auth.signOut();
    // ! Maybe this should be session not localstorage
    localStorage.removeItem("user");
    return this.router.navigate([""]);
  }
  
  // !! Need to fix issue when deleting user - may need to logout and then re-login first
  async deleteUser(user: User) {
    this.afs.doc<User>(`users/${user.uid}`).delete();
    this.afAuth.auth.currentUser.delete().catch(error => {
      console.log(error);
    });
    localStorage.removeItem("user");
    // this.router.navigate([""]);
  }
}

// public login(userInfo: User) {
//   localStorage.setItem('ACCESS_TOKEN', "access_token");
// }

// public isLoggedIn() {
//   // return true;
//   return localStorage.getItem('ACCESS_TOKEN') !== null;
// }

// public logout() {
//   localStorage.removeItem("ACCESS_TOKEN");
// }
