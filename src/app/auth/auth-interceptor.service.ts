import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable() 

export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService:AuthService) { }

  intercept(req,next){
    
    const reqClone=req.clone({
      headers:new HttpHeaders().set("token",this._authService.checkUserStatus())
    });
    return next.handle(reqClone);
  }
}
