import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { AuthService } from "src/app/Services/auth.service";
import { User } from "../../Models/user";
import { OrganizationsService } from "src/app/Services/organizations.service";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/Components/dialog/dialog.component';

@Component({
  selector: "app-org-admin",
  templateUrl: "./org-admin.component.html",
  styleUrls: ["./org-admin.component.scss"]
})
export class OrgAdminComponent implements OnInit {
  // user$: User = <User>{};
  
  mainForm: FormGroup;
  servicesForm: FormGroup;
  user$;
  orgId: string;
  dialogData

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private orgService: OrganizationsService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    // console.log(id);

    this.orgService.getOrganizationByUID( id ).subscribe( data => {
      
      // console.log(data);
      
      this.user$ = data;
      this.createForm();
    })

  }

  ngOnInit() {
  }

  createForm() {
    this.mainForm = this.formBuilder.group({
      organization: [`${this.user$.organization}`, Validators.required],
      phone: [`${this.user$.phone}`, Validators.required],
      website: [`${this.user$.website}`],
      contactEmail: [`${this.user$.contactEmail}`],
      about: [`${this.user$.about}`],
      otherServices: [`${this.user$.otherServices}`],
      beds: new FormControl(this.user$.services.beds),
      donations: new FormControl(this.user$.services.donations),
      childcare: new FormControl(this.user$.services.childcare),
      education: new FormControl(this.user$.services.education),
      interviewPrep: new FormControl(this.user$.services.interviewPrep),
      jobPlacement: new FormControl(this.user$.services.jobPlacement),
      servesFood: new FormControl(this.user$.services.servesFood)
    });

  }

  changeAddress(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '75vw',
      minHeight: '45vh',
      maxHeight: '85vh',
      data: {
              identifier: 'Address', 
              address: this.user$.fullAddress,
              location: this.user$.latLng
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });


  }





  logout() {
    this.authService.signOut();
  }

  deleteUser() {
    this.authService.deleteUser(this.user$);
    this.router.navigate([""]);    
  }
}
