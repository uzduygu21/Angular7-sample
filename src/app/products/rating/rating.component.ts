import { Component, OnInit, Input, EventEmitter,Output } from '@angular/core';
//Input for send value from parent to child
//Output and EventEmitter for send value from child to parent

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() rating:any;
  ratingArr:any=[];
  //WE use input to make child(rating) available for parent(products)
  // define ratingArr, it can be any king because we used any

  @Output() ratingEvent:EventEmitter<string>=new EventEmitter();
  //We use output, evetemitter send date from child to parent
  constructor() { }

  ngOnInit() {
    this.ratingArr=Array(Math.round(this.rating)).fill("x");
  //this will round numbers we have and fill with X, push into an array, I could use anything instead of X 
  }

  sendDataToParent(){
    this.ratingEvent.emit("Rating value=" + this.rating);
    //Always use .emit to get data , from child to parent
  }

}
