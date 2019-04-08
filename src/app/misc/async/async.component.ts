import { Component, OnInit,OnDestroy } from '@angular/core';//onDestroy will trigger once we move out from component
import { Observable, ConnectableObservable } from 'rxjs';
import { publish } from 'rxjs/operators';//for hot observables

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit,OnDestroy {

  $obsv=new Observable((observer)=>{
    setTimeout(()=>{
      observer.next("Data 1 processed")
    },1000);
    setTimeout(()=>{
      observer.next("Data 2 processed")
    },2000);
    setTimeout(()=>{
      observer.next("Data 3 processed")
    },3000);
    setTimeout(()=>{
      observer.next("Data 4 processed")
    },4000);
    setTimeout(()=>{
      observer.next("Data 5 processed")
    },5000);
  }).pipe(publish()) as ConnectableObservable<any>;
  //.pipe(publish())'i cold observ->hot observable!! Always use with as ConnectableObservable<any>, otherwise it throws an error

  cancelSubscription : any;

  loaddata : boolean=false;

  data:any=[]; //ng-container gostermek icin kullandik,ilk 2 saniye bos ondan sonra array'i gosterecek

  constructor() { }

  ngOnInit() {
    // this.cancelSubscription=this.$obsv.subscribe((data)=>{ unsubscribe kullanirken bu sekilde yaptik
    setTimeout(()=>{
      this.data=[1,2,3,4,5];
      this.loaddata=true;
    },2000)
    // this.$obsv.connect(); // hot icin kullaniyoruz .connect
    this.$obsv.subscribe((data)=>{
      console.log("First="+data);
    })
    setTimeout(()=>{
      this.$obsv.subscribe((data)=>{
        console.log("Second"+data)
      })
    },3000)
  }

  ngOnDestroy(){
  //   this.cancelSubscription.unsubscribe();
  // Mesela baska tag tiklandiginda sayma islemim hala devam etmesin, a lot of memory LEAK
  }

}
