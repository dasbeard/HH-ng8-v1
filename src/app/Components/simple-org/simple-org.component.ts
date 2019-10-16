import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/user';
import { ClickFunctionsService } from 'src/app/Services/click-functions.service';

@Component({
  selector: 'app-simple-org',
  templateUrl: './simple-org.component.html',
  styleUrls: ['./simple-org.component.scss']
})
export class SimpleOrgComponent implements OnInit {
  @Input() org: User;
  address: string;

  emailPlaceHolder: string = 'Email Us';
  clipboard: boolean = false;
  // timeNow;

  constructor( private clickFunction: ClickFunctionsService ) { 

  }

  ngOnInit() {
    this.createAddress();
  }
  
  createAddress(){
    this.address = this.org.fullAddress.substr(0, this.org.fullAddress.lastIndexOf(","));

  }

  visitWebsite(URL: string) {
    this.clickFunction.visitWebsite(URL)
  };

  getDirections(address: string) {
    this.clickFunction.openAddressInGoogleMaps(address);
  };

  copyEmail(email:string) {
    this.clickFunction.copyToClipboard(email);

    this.emailPlaceHolder = 'Copied to your Clipboard'
    this.clipboard = true;
    
    setTimeout(() => {
      this.emailPlaceHolder = 'Email Us'
      this.clipboard = false;
    }, 3000);

  }


}
