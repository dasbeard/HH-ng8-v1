import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/user';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  private organizationDoc: AngularFirestoreDocument<User>;
  organization: Observable<User>;
  constructor( private afs: AngularFirestore, ) {
  }
  
  // !! Need to use this to get users by UID
  getOrganizationByUID(uid){
    this.organizationDoc = this.afs.doc<User>(`users/${uid}`);

    console.log(this.organizationDoc.valueChanges());
    
    return this.organizationDoc.valueChanges();
    // return this.organization;
  }
    
}
