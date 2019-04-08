import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {

  productCode : any;

  constructor(private _activatedRoute:ActivatedRoute) { } 

  ngOnInit() {
    this._activatedRoute.params.subscribe((data)=>{
      this.productCode=data;
    })
  }

}
