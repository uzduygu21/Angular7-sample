import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[ProductsService]
})
export class ProductsComponent implements OnInit {
  pageTitle:String="Products"

  products:any=[];

  showHideImg:Boolean=true;  
  constructor(private _productService:ProductsService) {
    //this.products=this._productService.getProducts();

    // this._productService.getProducts().subscribe((data)=>{
    //   this.products = data;
    //Instead of riting codes here we typed in ngOnInit, because it's life cycle and better to write there
    // });  
  }

  ngOnInit() {
    this._productService.getProducts().subscribe((data)=>{
      this.products = data; // Promise then() is .subscribe in Angular 2+
    });
  }

  toggleImage(){
    this.showHideImg=!this.showHideImg; // hicbir zaman esit olmicak ve toggle etmesini sagladik
  }

  receiveDataFromChild(rating:string){
    console.log(rating); // console da rating leri gosterdi tiklayinca
    this.pageTitle=rating; // title'da gostermesini sagladik
  }

  }
