import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


// API Keys 
import { Keys } from '../../keys';

// Google Maps
import { AgmCoreModule } from '@agm/core';
// Google Maps Auto Complete
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';


// AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';

import { TextMaskModule } from 'angular2-text-mask';


import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule,  } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {MatCardModule} from '@angular/material/card';



import { HomePageComponent } from "./Pages/home-page/home-page.component";
import { OrganizationPageComponent } from "./Pages/organization-page/organization-page.component";
import { ServicesComponent } from "./Components/services/services.component";
import { HoursComponent } from "./Components/hours/hours.component";
import { SimpleOrgComponent } from './Components/simple-org/simple-org.component';
import { LoginRegisterComponent } from './Pages/login-register/login-register.component';
import { OrgAdminComponent } from './Pages/org-admin/org-admin.component';
import { RegisterAccountComponent } from './Components/register-account/register-account.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Pages/registration/registration.component';
import { SelectLocationComponent } from './Components/select-location/select-location.component';
import { AddOrgInformationComponent } from './Components/add-org-information/add-org-information.component';
import { AddOrgServicesComponent } from './Components/add-org-services/add-org-services.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    OrganizationPageComponent,
    ServicesComponent,
    HoursComponent,
    SimpleOrgComponent,
    LoginRegisterComponent,
    OrgAdminComponent,
    RegisterAccountComponent,
    LoginComponent,
    RegistrationComponent,
    SelectLocationComponent,
    AddOrgInformationComponent,
    AddOrgServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: Keys.googleMapsKey.apiKey,
      libraries: ['places']
    }),
    AngularFireModule.initializeApp(Keys.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatGoogleMapsAutocompleteModule,
    TextMaskModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
