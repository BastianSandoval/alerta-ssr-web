import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add-dog',
  templateUrl: './form-add-dog.component.html',
  styleUrls: ['./form-add-dog.component.css']
})
export class FormAddDogComponent implements OnInit {

  checkoutForm: FormGroup;

  constructor() {
    this.checkoutForm = this.createFormGroup();
   }

  ngOnInit(): void {
  }

  private createFormGroup() {
    return new FormGroup({
      nombrePerro: new FormControl('', [Validators.required]),
      nombreDueno: new FormControl('',[Validators.required]),
      raza: new FormControl('',[Validators.required]),
    })
  }

  get nombrePerro() {return this.checkoutForm.get('nombrePerro')}
  get nombreDueno() {return this.checkoutForm.get('nombreDueno')}
  get raza() {return this.checkoutForm.get('raza')}

}
