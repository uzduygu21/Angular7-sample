import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router'; //ROUTING
import { SharedModule } from '../../shared/shared.module';

import { ProductsComponent } from '../products/products.component'; //cut from app.module.ts
import { ProductsPipe } from '../products.pipe'; //cut from app.module.ts
import { RatingComponent } from '../rating/rating.component'; //cut from app.module.ts
import { DetailComponent } from '../detail/detail.component'; //cut from app.module.ts
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
      {path:"",component:ProductsComponent,canActivate:[AuthGuard]}, //to have products routing(products page)
      {path:"/:pId", component:DetailComponent,canActivate:[AuthGuard]}, //productname lere basinca onlarin sayfasina gondermek icin yarat.
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
