import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';//navbar ile checkUserStatus func. baglamam lazimki user'in giris yapip yapmadigini anlayalim.
//user giris yapti ise belli tag'leri gostericem, yapmadi ise sadece logout gozukecek

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authStatus:boolean;//variable tanimladim, boolean olarak tanimla html'de true-false olarak ilerlicez

  constructor(private _authService:AuthService) { }//authservice injected

  ngOnInit() {
    // this.authStatus=JSON.parse(this._authService.checkUserStatus());
    //checkUserStatus func'dan gelen deger authStatus var atandiki html'dede kullanabiliyim.
    //localStorage'dan gelen veri bydefault string geliyor, yani checkUserStatus ile string geldi fakat
    //fakat authStatus boolean tanimladim oyuzden parse ile esitledim!!!
  //bu line silmemin nedeni behaviorSubject kullanarak func.call reduce etcem. Asagida ayni islemi goruyorum zaten
    this._authService.$authCheck.subscribe((data:any)=>{
      this.authStatus=data;
    //observebles consume ettim subscribe ile.(login yapinca navbar automatically degismiyordu, bunun icin observables kullandik)
    })
  }

  logout(){
    this._authService.logout();
    //auth.service de olusturucam logout function'imi
  }

}
