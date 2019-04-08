import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'; 
import { HomeComponent } from './misc/home/home.component'; 
import { ProductsComponent } from './products/products/products.component';
import { TemplateComponent } from './forms/template/template.component';
import { ReactiveComponent } from './forms/reactive/reactive.component';
import { DetailComponent } from './products/detail/detail.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';


const routes:Routes=[ 
  {path:"products",loadChildren:"./products/products/products.module#ProductsModule"},
  {path:"home",component:HomeComponent,canActivate:[AuthGuard]}, 
  {path:"template",component:TemplateComponent,canActivate:[AuthGuard]}, //FORMS
  {path:"reactive",component:ReactiveComponent,canActivate:[AuthGuard]}, //FORMS
  {path:"login",component:LoginComponent}, 
  {path:"",redirectTo:"home",pathMatch:"full"}, 
  {path:"**",redirectTo:"home"} 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
