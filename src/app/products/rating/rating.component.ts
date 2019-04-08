import { Component, OnInit, Input, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() rating:any;
  ratingArr:any=[];

  @Output() ratingEvent:EventEmitter<string>=new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.ratingArr=Array(Math.round(this.rating)).fill("x"); 
  }

  sendDataToParent(){
    this.ratingEvent.emit("Rating value=" + this.rating);
  }

}
