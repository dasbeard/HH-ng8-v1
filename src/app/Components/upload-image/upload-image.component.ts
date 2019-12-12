import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { User } from "src/app/Models/user";
import { AngularFireStorage } from "@angular/fire/storage";
import { RegistationService } from 'src/app/Services/registation.service';


@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"]
})
export class UploadImageComponent implements OnInit {
  @Input() userData: User;
  @Input() updatePhoto: boolean;
  // @Output() dataForParent = new EventEmitter();
  @Output() dataEventToParent = new EventEmitter();



  dataForParent = {
    imageSelected: false,
    imgName: '',
    fileToUpload: File = null
  }


  
  churchImg;
  shelterImg;
  addImage;

  imageToDisplay;
  preview: boolean;
  // imageToDisplay: string;
  // fileToUpload: File = null;
  reader = new FileReader();
  matRadioBtnSelection;
  // imageSelected: Boolean = false;
  uploadPercent;

  constructor(private storage: AngularFireStorage, private regService: RegistationService) {
    
  }
  
  ngOnInit() {
    
    this.getImages();

    this.preview = true;
    if( this.userData.photoName ) {
      
      this.imageToDisplay = this.storage.ref(`userImages/${this.userData.photoName}`).getDownloadURL();
  
      
    } else {
      
      this.imageToDisplay = this.addImage;
      
    }
  


  }


  imagePreview(file: FileList) {
    console.log('temp');
    
    
    this.dataForParent.fileToUpload = file.item(0);
    
    if( this.dataForParent.fileToUpload ) {
      this.preview = false;
      this.removeRadioSelection();
      this.dataForParent.imgName = this.userData.uid;
      this.dataForParent.imageSelected = true;
      
      this.reader.onload = (event: any) => {
        this.imageToDisplay = event.target.result;
      }
      
      this.dataEventToParent.emit(this.dataForParent)
      
      this.reader.readAsDataURL(this.dataForParent.fileToUpload)
    } else {
      this.preview = true;
      this.dataForParent.imageSelected = false;
      this.dataForParent.imgName = '';
      this.dataEventToParent.emit(this.dataForParent)

      // this.imageToDisplay = "/assets/AddImageHere.png";
      this.imageToDisplay = this.addImage;


    }

  }


  removeRadioSelection() {
    if( this.matRadioBtnSelection) {
      this.matRadioBtnSelection.checked = false
    }
  
  }

  radioSelectImage(input){
    // console.log(this.preview);


    this.matRadioBtnSelection = input.source;
    this.dataForParent.imageSelected = true;


  
    if(input.value === 'church') {
      this.imageToDisplay = this.churchImg
      this.dataForParent.imgName = 'church';
      // console.log(this.dataForParent);
      
      this.dataEventToParent.emit(this.dataForParent);
    } 
    else if ( input.value === 'shelter' ) {
      this.imageToDisplay = this.shelterImg
      this.dataForParent.imgName = 'shelter';
      // console.log(this.dataForParent);
      
      this.dataEventToParent.emit(this.dataForParent);
    } else {
      this.dataForParent.imgName = this.userData.uid;
      // console.log(this.dataForParent);
      
      this.dataEventToParent.emit(this.dataForParent);
    }
 

  }


  getImages() {
    
    this.addImage = this.storage.ref(`Temp/AddImageHere.png`).getDownloadURL();
    this.churchImg = this.storage.ref(`Temp/Church.jpg`).getDownloadURL();
    this.shelterImg = this.storage.ref(`Temp/Shelter.jpg`).getDownloadURL();

  }

}
