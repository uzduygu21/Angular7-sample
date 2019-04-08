//app.module.ts icine ReactiveFormsModule olarak import ettim, reactive form kullanirken herzaman yapmam gerekir
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
//formgroup:acts like a data-type, formbuilder:service that we use to create forms,
//validators:service which will provide to implement the validation rules

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  userForm : FormGroup; //userForm verisini tanimladim, type olarak FormGroup kullaniyoruz

  constructor(private _fb:FormBuilder) { } // instance of the formBuilder

  ngOnInit() {
    this.userForm=this._fb.group({//this will help me to create form by specifying all fields
      firstname:["",[Validators.required,Validators.minLength(5)]],//first data for default,second for validatons if there's 1+ validatons put in array
      lastname:["",[Validators.required,Validators.minLength(5)]],
      email:["",[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      gender:["",Validators.required], //"" icine ne yazarsam sayfayi ilk actigimda yazili cikiyor,burda 1 tane validation var array icine almadik!
      address:""
    })
  }

  saveUserInfo(){
    console.log(this.userForm.value);//it's conbine with click func. when button clicked, it'll get all vales that entered in textbox witk keys
    //and show in my console as an object 
  }

  updateValidation(value){
    const addressControl=this.userForm.get("address");
    if(value=="female"){
      addressControl.setValidators([Validators.required,Validators.minLength(5)]);//validator set ettik,1+ ise [] array icine koy
    }else{
      addressControl.clearValidators();//female degilse validator ihtiyacimiz yok, clear
    }
    addressControl.updateValueAndValidity(); //validators setup larinda kullan herzaman
  }

}
