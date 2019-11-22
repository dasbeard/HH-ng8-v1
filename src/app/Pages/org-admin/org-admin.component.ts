import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "src/app/Services/auth.service";
import { User } from "../../Models/user";
import { OrganizationsService } from "src/app/Services/organizations.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogComponent } from "src/app/Components/dialog/dialog.component";
import { RegistationService } from "src/app/Services/registation.service";

@Component({
  selector: "app-org-admin",
  templateUrl: "./org-admin.component.html",
  styleUrls: ["./org-admin.component.scss"]
})
export class OrgAdminComponent implements OnInit {
  user$: User;

  mainForm: FormGroup;
  servicesForm: FormGroup;
  orgId: string;
  dialogData;

  hoursToEdit: string = "hoursOfOperation";
  hoursToEditString: string = "Hours Of Operation";

  bedVariable: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private orgService: OrganizationsService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private registrationService: RegistationService,
    private snackBar: MatSnackBar
  ) {
    let id = this.route.snapshot.paramMap.get("id");

    this.orgService.getOrganizationByUID(id).subscribe(data => {
      if (data) {
        this.user$ = data;
        this.createForm();
        this.bedVariable = this.mainForm.value.beds;
      }
    });
  }

  ngOnInit() {}

  showServesFoodHours(value: boolean) {
    this.registrationService.updateServesFood(this.user$, value);
    if (!value) {
      this.changeHoursToEdit("hoursOfOperation");
      this.showSnackbar("No Longer Serving Food", "Dismiss");
    }
    if (value) {
      this.changeHoursToEdit("hoursServingFood");
      this.editHours();
    }
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

  changeAddress() {
    // Open dialog with slect address component
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "75vw",
      maxWidth: "800px",
      minHeight: "45vh",
      maxHeight: "85vh",
      data: {
        identifier: "Address",
        user: this.user$
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event.type === "close") {
          // console.log("Address closed");
        }
        if (result.event.type === "addressUpdated") {
          this.showSnackbar("Address Updated", "Dismiss");
        }
      }
    });
  }

  updateProfile() {
    this.registrationService.updateProfile(this.user$, this.mainForm.value);
    this.showSnackbar("Profile Updated", "Dismiss");
  }

  editImg() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "75vw",
      maxWidth: "800px",
      minHeight: "45vh",
      maxHeight: "85vh",
      data: {
        identifier: "editImage",
        user: this.user$
      }
    });
  }

  editBedCount() {
    // console.log('test');
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "75vw",
      maxWidth: "550px",
      minHeight: "30vh",
      maxHeight: "85vh",
      data: {
        identifier: "bedCount",
        user: this.user$
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event.type === "bedsUpdated") {
          this.showSnackbar("Bed Count Updated", "Dismiss");
        }
      }
    });


  }

  updateBedCount(value) {
    this.bedVariable = value;

    if (value) {
      // Open Dialog to update bed count
      const dialogRef = this.dialog.open(DialogComponent, {
        width: "75vw",
        maxWidth: "550px",
        minHeight: "30vh",
        maxHeight: "85vh",
        data: {
          identifier: "bedCount",
          user: this.user$
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.event.type === "bedsUpdated") {
            this.showSnackbar("Bed Count Updated", "Dismiss");
          } else {
            this.bedVariable = false;
            this.mainForm.controls["beds"].setValue(false);
          }
        } else {
          this.bedVariable = false;
          this.mainForm.controls["beds"].setValue(false);
        }
      });
    }
  }

  showSnackbar(message: string, action) {
    this.snackBar.open(message, action, { duration: 1500 });
  }

  editHours() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "75vw",
      maxWidth: "800px",
      minHeight: "45vh",
      maxHeight: "85vh",
      data: {
        identifier: "editHours",
        user: this.user$,
        hours: this.hoursToEdit
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event.type === "Updated Hours") {
          this.changeHoursToEdit(result.event.hoursUpdated);

          if (result.event.hoursUpdated === "hoursOfOperation") {
            this.showSnackbar("Hours Of Operation Updated", "Dismiss");
          }

          if (result.event.hoursUpdated === "hoursServingFood") {
            this.showSnackbar("Hours Serving Food Updated", "Dismiss");
          }
        } else if (result.event.type === "close") {
          // console.log('closed');
        }
      }
    });
  }

  changeHoursToEdit($event) {
    this.hoursToEdit = $event;
    if (this.hoursToEdit === "hoursOfOperation") {
      this.hoursToEditString = "Hours Of Operation";
    }
    if (this.hoursToEdit === "hoursServingFood") {
      this.hoursToEditString = "Hours Serving Food";
    }
  }

  deleteUserDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "75vw",
      maxWidth: "800px",
      minHeight: "45vh",
      maxHeight: "85vh",
      data: {
        identifier: "deleteUser",
        user: this.user$
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event.type === "delete") {
          console.log("Delete User");
          this.deleteUser();
        }
      }
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
