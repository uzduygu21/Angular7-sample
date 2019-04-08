import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProductsService {

  constructor(private _http : HttpClient,private _authService:AuthService) {}
    
  getProducts(){
    return this._http.get("http://localhost:3000/products");
    }
   }

