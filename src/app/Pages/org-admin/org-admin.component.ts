import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Services/auth.service";
import { User } from '../../Models/user'

@Component({
  selector: "app-org-admin",
  templateUrl: "./org-admin.component.html",
  styleUrls: ["./org-admin.component.scss"]
})
export class OrgAdminComponent implements OnInit {
  user$:User = <User>{};

  constructor(private authService: AuthService, private router: Router) {

    this.authService.user$.subscribe( user => {
      this.user$ = user;
    })
  }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }

  deleteUser(){
    this.authService.deleteUser(this.user$);
  }


}
