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

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
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

  async createUser(user:CreateUser){
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then( data => {
      const uid = data.user.uid;

      this.afs.collection<CreateUser>(`users`).doc(uid).set({
        email: user.email, organization: user.organization, uid:uid
      });
      this.router.navigateByUrl("/OrgAdmin");
    })

  }


  async signIn(user: CreateUser) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
    return this.updateUserData(credential.user);
  }

  private updateUserData(user){
    // console.log(user);
    
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      // organization: user.organization
      // photoURL
    };
    this.router.navigate(['/OrgAdmin']);
    return userRef.set(data, {merge:true});
  }


  async signOut(){
    await this.afAuth.auth.signOut();
    return this.router.navigate(['']);
  }


  async deleteUser(user:User){
    // console.log(user);
    this.afAuth.auth.currentUser.delete().then(() => {
      // console.log('user auth has been deleted');
      this.afs.doc<User>(`users/${user.uid}`).delete();
      // console.log('user data has been deleted');
      this.router.navigate(['']);
    }).catch(error => {
      console.log(error);
    })
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
