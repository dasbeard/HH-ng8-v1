import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/Models/user";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"]
})
export class UploadImageComponent implements OnInit {
  @Input() userData: User;

  photoToDisplay: string;
  churchImg;
  // churchImg: Observable<string> = null;
  shelterImg;

  constructor(private storage: AngularFireStorage) {
    // this.shelterImg = this.storage.ref('Temp/Shelter.jpg');
    // const ref200 = this.storage.ref(`Albums/thumb@200_${this.albumInfo.imageName}`);
  }

  ngOnInit() {
    // console.log(this.userData);
    // if( this.userData.photoURL ) {
    //   this.photoToDisplay = this.userData.photoURL;
    // } else {
    this.photoToDisplay = "/assets/AddImageHere.png";
    this.getImages();
    // }
  }

  getImages() {
    // gs://hh-ng8-v1.appspot.com/Temp/Church.jpg

    // let tempChurch = this.storage.storage.ref('/Temp/Church.jpg');

    this.storage.ref(`Temp/Church.jpg`).getDownloadURL().subscribe( data => {
      this.churchImg = data
    });
    this.storage.ref(`Temp/Shelter.jpg`).getDownloadURL().subscribe( data => {
      this.shelterImg = data
    });
    


    // let tempChurch = this.storage.ref(`Temp/Church.jpg`);
    // this.churchImg = tempChurch.getDownloadURL();
    // console.log(this.churchImg);
    
  }

}
