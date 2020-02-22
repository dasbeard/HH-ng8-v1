import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { OrganizationPageComponent } from './Pages/organization-page/organization-page.component';
import { LoginRegisterComponent } from './Pages/login-register/login-register.component';
import { OrgAdminComponent } from './Pages/org-admin/org-admin.component';
import { AuthGuard } from './auth.guard';
import { RegistrationComponent } from './Pages/registration/registration.component';
import { SelectLocationComponent } from './Components/select-location/select-location.component';
import { AddOrgInformationComponent } from './Components/add-org-information/add-org-information.component';
import { AddOrgServicesComponent } from './Components/add-org-services/add-org-services.component';
import { AddOrgHoursComponent } from './Components/add-org-hours/add-org-hours.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomePageComponent,
    children: []
  }, 
  {
    path: "Organization/:id",
    pathMatch: "full",
    component: OrganizationPageComponent,
    children: []
  },
  {
    path: "LoginRegister",
    pathMatch: "full",
    component: LoginRegisterComponent,
    children: []
  },
  {
    path: "Register",
    // pathMatch: "full",
    component: RegistrationComponent,
    children: [
      { path: "", component: SelectLocationComponent},
      { path: "MoreInfo", component: AddOrgInformationComponent},
      { path: "Services", component: AddOrgServicesComponent},
      { path: "Hours", component: AddOrgHoursComponent},
    ]
      
  },
  {
    path: "OrgAdmin/:id",
    // pathMatch: "full",
    component: OrgAdminComponent,
    canActivate: [AuthGuard]
  },

  
  
  {
    path: "**",
    // component: HomePageComponent,
    redirectTo: ""
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = {
    OrgAdminComponent
}