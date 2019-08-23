import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { OrganizationPageComponent } from './Pages/organization-page/organization-page.component';
import { HoursComponent } from './Components/hours/hours.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomePageComponent,
    children: []
  }, 
  {
    path: "OrganizationPage",
    pathMatch: "full",
    component: OrganizationPageComponent,
    children: []
  },
  {
    path: "hours",
    pathMatch: "full",
    component: HoursComponent,
    children: []
  },
  
  
  {
    path: "**",
    component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
