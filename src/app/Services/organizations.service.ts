import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/user';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  private organizationDoc: AngularFirestoreDocument<User>;
  organization: Observable<User>;
  hoursDoc: AngularFirestoreDocument<User>;
  
  private allOrganizationsCollection: AngularFirestoreCollection<User>;

  constructor( 
    private afs: AngularFirestore, 
    private storage: AngularFireStorage,
    ) {
    this.allOrganizationsCollection = afs.collection<User>('users');
  }
  
  getOrganizationByUID(uid){
    this.organizationDoc = this.afs.doc<User>(`users/${uid}`);
    return this.organizationDoc.valueChanges();
  }

  getAllOrgs() {
    return this.allOrganizationsCollection.valueChanges();
  }

  getOrgHours(uid: string ) {
    
    this.hoursDoc = this.afs.doc(`users/${uid}`);
    return this.hoursDoc.snapshotChanges();
    
  }

  getOrgImage( imageName:string ) {
    return this.storage.ref(`userImages/${imageName}`).getDownloadURL();
  }


}
