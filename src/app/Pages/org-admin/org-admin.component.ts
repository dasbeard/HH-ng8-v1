import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { AuthService } from "src/app/Services/auth.service";
import { User } from "../../Models/user";
import { OrganizationsService } from "src/app/Services/organizations.service";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/Components/dialog/dialog.component';
import { RegistationService } from 'src/app/Services/registation.service';

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

  hoursToEdit: string = 'hoursOfOperation';


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private orgService: OrganizationsService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private registrationService: RegistationService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    // console.log(id);

    this.orgService.getOrganizationByUID( id ).subscribe( data => {
      
      // console.log(data);
      if(data){

        this.user$ = data;
        this.createForm();
      }
        
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
    // Open dialog with slect address component
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '75vw',
      maxWidth: '800px',
      minHeight: '45vh',
      maxHeight: '85vh',
      data: {
              identifier: 'Address', 
              user: this.user$
            }
    });

    // dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    // });

  }

  updateProfile() {
    // console.log(this.user$);
    // console.log(this.mainForm.value);
    
    this.registrationService.updateProfile(this.user$, this.mainForm.value);

  }


  // hoursMessage($event){
  //   // console.log($event);
    
  //   if($event.result === 'update') {
  //     if($event.identifier === 'hoursOfOperation') {
  //       this.registrationService.addUserHours('hoursOfOp', $event.hours, this.user$) 
  //     }
  //     if($event.identifier === 'hoursServing') {
  //       this.registrationService.addUserHours('servingFood', $event.hours, this.user$) 
  //     }
  //   }
  // }


  editHours(){
    // console.log(this.hoursToEdit);
    
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '75vw',
      maxWidth: '800px',
      minHeight: '45vh',
      maxHeight: '85vh',
      data: {
              identifier: 'editHours', 
              user: this.user$,
              hours: this.hoursToEdit
            }
    })


    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
    })

  }


  changeHoursToEdit($event) {
    this.hoursToEdit = $event;
  }



  deleteUserDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '75vw',
      maxWidth: '800px',
      minHeight: '45vh',
      maxHeight: '85vh',
      data: {
              identifier: 'deleteUser', 
              user: this.user$
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if(result.event === 'delete'){
        console.log('Delete User');
        this.deleteUser();
      }
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  deleteUser() {
    this.router.navigate([""]);    
    setTimeout(() => {
      
      this.authService.deleteUser(this.user$);
    }, 250);

  }


  logout() {
    this.authService.signOut();
  }

}
