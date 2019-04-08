import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthService } from '../auth/auth.service';
//checkUserStatus func is in auth.service, that's why I imported it

@Injectable()
export class ProductsService {

  constructor(private _http : HttpClient,private _authService:AuthService) {}
    
  getProducts(){
    return this._http.get("http://localhost:3000/products");
    // return this._http.get("http://localhost:3000/products",{
      // headers:new HttpHeaders().set("token",this._authService.checkUserStatus())
  //this is how I send header, when I typed this line, it'll automatically add in import and my local storage value will be token
  //if we have a lot of API calls and we need to change one thing, it's hard to send token for all of them.
  //that's why we created auth-interceptor.service which will allow you to intercept all Http req that's going from your angular app
      // });
    }
   }

