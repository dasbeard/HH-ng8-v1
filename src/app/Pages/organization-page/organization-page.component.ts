import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { OrganizationsService } from "src/app/Services/organizations.service";
import { User } from "src/app/Models/user";
import { ClipboardService } from "ngx-clipboard";

@Component({
  selector: "app-organization-page",
  templateUrl: "./organization-page.component.html",
  styleUrls: ["./organization-page.component.scss"]
})
export class OrganizationPageComponent implements OnInit {
  organization: User;
  emailPlaceHolder: string = 'Email Us';
  clipboard: boolean = false;
  orgImage;

  constructor(
    private orgService: OrganizationsService,
    private route: ActivatedRoute,
    private clipboardService: ClipboardService
  ) {
    let uid = this.route.snapshot.paramMap.get("id");

    this.orgService.getOrganizationByUID(uid).subscribe(orgData => {
      this.organization = orgData;
      this.orgImage = this.orgService.getOrgImage(this.organization.photoName);

    });
  }

  ngOnInit() {}

  visitWebsite(URL: string) {
    window.open(URL, "_blank");
  }

  openAddressinGoogleMaps(URL: string) {
    const baseURL = "https://www.google.com/maps/dir/?api=1&destination=";
    const urlEncoded = encodeURI(URL);
    const fullURL = baseURL + urlEncoded;

    window.open(fullURL, "_blank");
  }

  copyEmailToClipboard() {
    // console.log(email);
    this.clipboardService.copyFromContent(this.organization.contactEmail);
    this.emailPlaceHolder = 'Copied to your Clipboard'
    this.clipboard = true;
    
    setTimeout(() => {
      this.emailPlaceHolder = 'Email Us'
      this.clipboard = false;
    }, 3000);

  }

}
