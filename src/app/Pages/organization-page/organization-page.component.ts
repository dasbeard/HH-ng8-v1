import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { OrganizationsService } from 'src/app/Services/organizations.service';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.scss']
})
export class OrganizationPageComponent implements OnInit {

  organization: User;
  
  constructor(
    private orgService: OrganizationsService,
    private route: ActivatedRoute,
  ) { 
    let uid = this.route.snapshot.paramMap.get( 'id' );

    this.orgService.getOrganizationByUID( uid ).subscribe( orgData => {
      this.organization = orgData;
    });
  }

  ngOnInit() {
    
  }

  visitWebsite( URL ) {
    window.open( URL, "_blank");
  }

  openAddressinGoogleMaps(URL) {
    const baseURL = "https://www.google.com/maps/dir/?api=1&destination="
    const urlEncoded = encodeURI(URL);
    const fullURL = baseURL + urlEncoded;

    window.open( fullURL, "_blank");
  }

}
