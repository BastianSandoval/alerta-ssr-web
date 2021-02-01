import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-edit-dog',
  templateUrl: './form-edit-dog.component.html',
  styleUrls: ['./form-edit-dog.component.css']
})
export class FormEditDogComponent implements OnInit {

  checkoutForm: FormGroup;

  constructor() {
    this.checkoutForm = this.createFormGroup();
   }
  ngOnInit(): void {
  }

  createFormGroup(){
    return new FormGroup({
     nameDog: new FormControl('',[Validators.required]),
     nameOwner: new FormControl('',[Validators.required]),
     raza: new FormControl('',[Validators.required,]),
    })
  }

  get nameDog() { return this.checkoutForm.get('nameDog'); }
  get nameOwner() { return this.checkoutForm.get('nameOwner');}
  get raza(){ return this.checkoutForm.get('raza');}


}
