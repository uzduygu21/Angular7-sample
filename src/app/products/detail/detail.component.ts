import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//use this service consume the value that's available in your URL as in the form of parameters, activated routes sonradan ekledim 

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {

  productCode : any; // productCode kullanicam oyuzden tanimladim, JS deki var gbi dusun

  constructor(private _activatedRoute:ActivatedRoute) { } // route tanimladim

  ngOnInit() {
    this._activatedRoute.params.subscribe((data)=>{
      this.productCode=data;
      // angularJS deki params gibi
      // console.log(this._activatedRoute.params); Baktiginda observable dondurdugunu goruyoruz ve oyuzden subscribe kullandik
      //linkleri tiklayinca sayfasina goturup productCode u bizim icin available yapti// bidaha dinle bu kismi
    })
  }

}
