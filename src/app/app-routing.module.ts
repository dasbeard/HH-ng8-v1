import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { OrganizationPageComponent } from './Pages/organization-page/organization-page.component';
import { LoginRegisterComponent } from './Pages/login-register/login-register.component';
import { OrgAdminComponent } from './Pages/org-admin/org-admin.component';
import { AuthGuard } from './auth.guard';
import { RegistrationComponent } from './Pages/registration/registration.component';


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
    path: "LoginRegister",
    pathMatch: "full",
    component: LoginRegisterComponent,
    children: []
  },
  {
    path: "Register",
    pathMatch: "full",
    component: RegistrationComponent,
    children: []
  },
  {
    path: "OrgAdmin",
    pathMatch: "full",
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
