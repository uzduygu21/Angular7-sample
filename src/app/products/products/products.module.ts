import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { ProductsComponent } from '../products/products.component'; 
import { ProductsPipe } from '../products.pipe'; 
import { RatingComponent } from '../rating/rating.component'; 
import { DetailComponent } from '../detail/detail.component'; 
import { AuthGuard } from '../../auth/auth.guard';
import { AuthInterceptorService } from '../../auth/auth-interceptor.service';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductsPipe,
    RatingComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild([
      {path:"",component:ProductsComponent,canActivate:[AuthGuard]}, 
      {path:"/:pId", component:DetailComponent,canActivate:[AuthGuard]},
    ])
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    }
  ]
})
export class ProductsModule { }
