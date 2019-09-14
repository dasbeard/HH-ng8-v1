import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { AuthService } from "src/app/Services/auth.service";
import { User } from "../../Models/user";
import { OrganizationsService } from "src/app/Services/organizations.service";
import { Observable } from 'rxjs';

@Component({
  selector: "app-org-admin",
  templateUrl: "./org-admin.component.html",
  styleUrls: ["./org-admin.component.scss"]
})
export class OrgAdminComponent implements OnInit {
  // user$: User = <User>{};
  user$;
  orgId: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private orgService: OrganizationsService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    // console.log(id);

    this.orgService.getOrganizationByUID( id ).subscribe( data => {
      this.user$ = data;
    })

  }

  ngOnInit() {
    
  }

  logout() {
    this.authService.signOut();
  }

  deleteUser() {
    this.authService.deleteUser(this.user$);
  }
}
