import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


// API Keys for Google Maps
import { Keys } from '../../keys';
import { AgmCoreModule } from '@agm/core';


import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';


import { HomePageComponent } from "./Pages/home-page/home-page.component";
import { OrganizationPageComponent } from "./Pages/organization-page/organization-page.component";
import { ServicesComponent } from "./Components/services/services.component";
import { HoursComponent } from "./Components/hours/hours.component";
import { SimpleOrgComponent } from './Components/simple-org/simple-org.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    OrganizationPageComponent,
    ServicesComponent,
    HoursComponent,
    SimpleOrgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: Keys.googleMapsKey.apiKey
    }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
