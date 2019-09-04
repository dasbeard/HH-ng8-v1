import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Services/auth.service";

@Component({
  selector: "app-org-admin",
  templateUrl: "./org-admin.component.html",
  styleUrls: ["./org-admin.component.scss"]
})
export class OrgAdminComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("");
  }
}
