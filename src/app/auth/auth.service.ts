import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { Subject, BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root' 
})
export class AuthService {

  $authCheck=new BehaviorSubject(this.checkUserStatus()); 
  constructor(private _router:Router, private _http:HttpClient) { } 
 
  login(credentials:any){
    this._http.post("http://localhost:3000/authenticate",credentials).subscribe((data:any)=>{
      // console.log(data); 
      if(data.isLoggedIn){
        window.localStorage.setItem("isLoggedIn",data.token);
        this.$authCheck.next(this.checkUserStatus());
        this._router.navigate(['/home']);
      }else{
        alert("Invalid credentials")
        return false;
      }
    })
  }

  checkUserStatus(){
    return window.localStorage.getItem("isLoggedIn") || "";
  }

  logout(){
    window.localStorage.removeItem("isLoggedIn");
    this.$authCheck.next(this.checkUserStatus());
    this._router.navigate(['/login']);
  }
}
