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
    let data = await this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {    
          let newUser = {
            uid: data.user.uid, 
            email: user.email, 
            organization: user.organization 
          };
        
          // console.log(newUser);
        
        this.regService.startNewUser(newUser);
        return ' success'
      }).catch(error => {
        // console.log(error);
        return error
      });

      return { data: data}
  }



  async signIn(user: CreateUser) {

    let data = await this.afAuth.auth.signInWithEmailAndPassword(
      user.email,
      user.password
    ).then(userCredential => {

      this.newUserAfsDoc = this.afs.doc(`users/${userCredential.user.uid}`);
      this.newUserAfsDoc.valueChanges().subscribe(user => {
        localStorage.setItem("user", JSON.stringify(user));
      });
      this.router.navigate([`/OrgAdmin/${userCredential.user.uid}`]);
      return 'success';
      
    }).catch(error => {
      var errorCode = error.code;
      // var errorMessage = error.message;
      
      if (errorCode === 'auth/wrong-password') {
        return 'Wrong Password'
      } else if (errorCode === 'auth/too-many-requests') {
        return 'Too Many Request - Wait and try again'
      } else if(errorCode === 'auth/user-not-found') {
        return 'Username Not Found'
      } else {
        return 'Something went wrong - We will look into it'
      }
    })
    return await {data: data}
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

