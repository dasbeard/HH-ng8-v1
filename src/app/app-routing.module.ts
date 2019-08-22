import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomePageComponent,
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
