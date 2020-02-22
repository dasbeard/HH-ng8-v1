import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from "../../Services/auth.service";
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!( control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return control.parent.errors && control.parent.errors && control.touched && ( invalidCtrl || invalidParent )
  }
}


@Component({
  selector: "app-register-account",
  templateUrl: "./register-account.component.html",
  styleUrls: ["./register-account.component.scss"]
})

export class RegisterAccountComponent implements OnInit {
  @Output() goToLogin = new EventEmitter<boolean>();

  hidePass: boolean = true;
  hidePassConf: boolean = true;
  registerForm: FormGroup;
  
  matcher = new MyErrorStateMatcher();

  error:boolean = false;
  errorMessage:String = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      organization: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
    }, { validator: this.checkPasswords });

  }

  get formControls() {
    return this.registerForm.controls;
  }

  async register(formValues) {

    this.error = false;
    let response = await this.authService.createUser(formValues);


    if (response.data === 'success') {
    //   // console.log(temp.data);
      this.registerForm.reset();
    } else {
      this.error = true;
      this.errorMessage = response.data.message
      this.registerForm.reset({organization: formValues.organization, email: '', password: '',  confirmPassword: ''});
    }

  }


  // register() {
    // if (this.registerForm.invalid) {
    //   this.registerForm.reset();
    //   return;
    // }

    // let pass = this.registerForm.get("password").value;
    // let confPass = this.registerForm.get("confirmPassword").value;

    // let passwordsMatch = this.verifyPasswords(pass, confPass);

    // if (passwordsMatch) {
      // this.authService.createUser(this.registerForm.value);
    // } else {
    //   alert("Passwords dont match");
    // }
  // }

  // verifyPasswords(password, confirmPassword) {
  //    if (password === confirmPassword) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  login() {
    this.goToLogin.emit(true);
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group  
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }


  getErrorMessage() {
    return  this.registerForm.controls.email.hasError('required') ? 'You must enter a value' :
    this.registerForm.controls.email.hasError('email') ? 'Not a valid email' :
    '';
  }

  getErrorMessagePass() {
    return  this.registerForm.controls.password.hasError('required') ? 'Not a valid password' :
    this.registerForm.controls.password.setAsyncValidators ? 'Must be at least 6 Characters' :
    '';
  }



}
