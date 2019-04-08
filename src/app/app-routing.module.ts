import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'; //I typed this but if I said yes for routing at first 
//when I was creating angular, it'll be here automatically
import { HomeComponent } from './misc/home/home.component'; //i didn't type, it appears automatically when I typed home below
import { ProductsComponent } from './products/products/products.component';//i didn't type, it appears automatically when I typed products below
import { TemplateComponent } from './forms/template/template.component';//Imported for forms
import { ReactiveComponent } from './forms/reactive/reactive.component';//imported for forms7
import { DetailComponent } from './products/detail/detail.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AsyncComponent } from './misc/async/async.component';//showing new feature of observables(we'll use this)
//when I typed canActivate:[AuthGuard] part below, these parts typed automatically, Angular does that

const routes:Routes=[ // if I created route before it was gonna be here auto.
  {path:"products",loadChildren:"./products/products/products.module#ProductsModule"},// TO LINK PRODUCTS MODULE*****
  {path:"home",component:HomeComponent,canActivate:[AuthGuard]}, //to have home routing(home page)
  //canActivate part is for implementing restrictions to URL(we download guard to do it) ng g guard auth/auth
  // {path:"products",component:ProductsComponent,canActivate:[AuthGuard]}, //to have products routing(products page) PRODUCTS COMPONENT TASIDIK!!
  {path:"template",component:TemplateComponent,canActivate:[AuthGuard]}, //FORMS
  {path:"reactive",component:ReactiveComponent,canActivate:[AuthGuard]}, //FORMS
  {path:"async",component:AsyncComponent,canActivate:[AuthGuard]},
  {path:"login",component:LoginComponent}, //to have login page routing
  // {path:"products/:pId", component:DetailComponent,canActivate:[AuthGuard]}, //PRODUCTS COMPONENT TASIDIK!!productname lere basinca onlarin sayfasina gondermek icin yarat. route
  {path:"",redirectTo:"home",pathMatch:"full"}, // this is my root,it's for /,we have to specify pathMatch otherwise angular get confuse which one is root 
  {path:"**",redirectTo:"home"} // for catching all exceptions
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // these all I typed because I didn't have correct routing
})
export class AppRoutingModule { }
