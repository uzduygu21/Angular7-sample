import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
//to use reactive forms we need to implement here and specify in imports array
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';//1 component sadece 1 module'de kullaniliyor. Farkli module'lerde kullanmam gerekiyorsa 
      //Shared module olusturmaliyim. Shared module olusturdum ve buraya(main) inject ettim

import { AppComponent } from './app.component';
// import { ProductsComponent } from './products/products/products.component';//LAZY LOADING ICIN PRODUCTS MODULE YARATTIK
// import { ProductsPipe } from './products/products.pipe';      VE PRODUCTS AIT OLANLARI ONUN ICINE TASIDIK
import { HomeComponent } from './misc/home/home.component';
import { AppRoutingModule } from './app-routing.module';
// import { RatingComponent } from './products/rating/rating.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
// import { DetailComponent } from './products/detail/detail.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { TemplateComponent } from './forms/template/template.component';
import { ReactiveComponent } from './forms/reactive/reactive.component';
import { AsyncComponent } from './misc/async/async.component';//httpInterceptor import ettim,this provides me new service to handle all API calls

@NgModule({
  declarations: [
    AppComponent,
    // ProductsComponent,
    // ProductsPipe,
    HomeComponent,
    // RatingComponent,
    NavbarComponent,
    // DetailComponent,
    LoginComponent,
    TemplateComponent,
    ReactiveComponent,
    AsyncComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  //normally when we create service just write in providers:[],but http_Interceptors special,use below!!
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
