import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';//authService'i authentication func larimin hepsini koymak icin olusturdum
//ve login fun.'da onun icinde old. icin oncelikle import ediyorum

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth:any={} //auth objectini tanimladim, simdilik sadece 2 verim var sonradan cok verim olur diye object ile calismak en sagliklisi

  constructor(private _authService:AuthService) { }//authService inject ettim

  ngOnInit() {
  }

  login(){
    this._authService.login(this.auth);
  }

}
