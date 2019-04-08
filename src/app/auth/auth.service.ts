import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // angularJS deki $location-path benzeri, burdada bu sekilde import etmek gerekiyor.
//Login page'den home page'e baglanabilmek icin kullandim, route ihtiyacim vardi
import { Subject, BehaviorSubject } from 'rxjs';
//login veya logout yapinca navbar automatically degismiyordu bunun icin observables kullandim cunku login ve navigation sibling components
//difference between subject and behaviorsubject is behaviorsubj holds initial value
import { HttpClient } from '@angular/common/http';
//simdiye kadar credentials client side'da idi bunlari server side cekmem lazim, http bunun icin kullaniyorum


@Injectable({
  providedIn: 'root' // Global ve o sekilde kalmasini istiyorum, bu func. oyuzden yarattim
})
export class AuthService {

  $authCheck=new BehaviorSubject(this.checkUserStatus());//injecting subject like this. Any variable you're using for observables, it's better to start with $. Recommended way
//behaviorsubj parameter istiyor, hold edecegi icin. 
  constructor(private _router:Router, private _http:HttpClient) { } // import ettigim router'i ve http inject ettim
 
  login(credentials:any){
    this._http.post("http://localhost:3000/authenticate",credentials).subscribe((data:any)=>{
      //this will return observable obj that's why we need to use subscribe
      // console.log(data);//post req te en az 2(1st URL,second data you wanna post) parameter olmak zorunda,ve 
      if(data.isLoggedIn){
        // window.localStorage.setItem("isLoggedIn",data.isLoggedIn);
        window.localStorage.setItem("isLoggedIn",data.token);//instead of having true/false we have token value.
        this.$authCheck.next(this.checkUserStatus());
        this._router.navigate(['/home']);
      }else{
        alert("Invalid credentials")
        return false;
      }
    })//instead of doing check in here, we moved it to server. Checking if username&password is admin
  }

  // login(credentials:any){
  //   if(credentials.username=="admin" && credentials.password=="admin"){
  //     window.localStorage.setItem("isLoggedIn","true"); //user'in logged in yapip yapmadigini anlamak icin olusturduk
  //     this.$authCheck.next(this.checkUserStatus());//emittin an event in observables. Use NEXT!!
  //     this._router.navigate(['/home']); //passing configuration is always ['/blabla']
  //   }else{
  //     alert("Invalid credentials!!");
  //   }
  // }Bu sekilde client side'da calisiyor. Server side a cekmek icin ustteki gibi Post req kullanicam ve code'larim server.js de olacak

  checkUserStatus(){
    return window.localStorage.getItem("isLoggedIn") || "";
    //wherever in my app, when I call this func.,it'll return something which will help me to understand user logged in or NOT. 
  }

  logout(){
    window.localStorage.removeItem("isLoggedIn");
    this.$authCheck.next(this.checkUserStatus());//emitting and event in observables
    this._router.navigate(['/login']);
  //client dogru bilgileri girince localStorage olusturduk, logout yapildi ise silinmesi gerekli ve login page'e geri yonlendirdik navigate ile
  }
}
