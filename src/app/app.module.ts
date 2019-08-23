import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import {MatCheckboxModule} from '@angular/material/checkbox';


import { HomePageComponent } from "./Pages/home-page/home-page.component";
import { OrganizationPageComponent } from "./Pages/organization-page/organization-page.component";
import { ServicesComponent } from "./Components/services/services.component";
import { HoursComponent } from "./Components/hours/hours.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    OrganizationPageComponent,
    ServicesComponent,
    HoursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
