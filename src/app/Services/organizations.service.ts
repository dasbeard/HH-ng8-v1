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
  
  getOrganizationByUID(uid){
    this.organizationDoc = this.afs.doc<User>(`users/${uid}`);
    return this.organizationDoc.valueChanges();
  }
    
}
