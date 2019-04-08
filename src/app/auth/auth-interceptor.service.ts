import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpHeaders} from '@angular/common/http';
import { AuthService } from './auth.service';//constructor ekleyince automatically eklendi


@Injectable() //root sildik cunku globally available olmasini istemiyorum

export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService:AuthService) { }

  intercept(req,next){
    //making copy of existing request object and inside of that things I want to modify
    const reqClone=req.clone({
      headers:new HttpHeaders().set("token",this._authService.checkUserStatus())
    });
    return next.handle(reqClone);//always return next!calling next process in queu with that we pass new process obj
  }
}//we'll import this service to app.module bcuz we want this to be globally available
