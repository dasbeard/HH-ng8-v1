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

}
