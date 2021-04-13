import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-screen',
  templateUrl: './settings-screen.component.html',
  styleUrls: ['./settings-screen.component.css']
})
export class SettingsScreenComponent implements OnInit {
  
  checkoutForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder
    ){

    this.checkoutForm = this.createFormGroup();
    this.createFormGroup();

    }

  ngOnInit() {

  };

  saveChange(event: Event){
    event.preventDefault(); 
  }

  private createFormGroup() {
    return new FormGroup({
      actualLocation: new FormControl('', [Validators.required]),
      otherLocation: new FormControl('',[Validators.required]),
      minimalChecks: new FormControl('',[Validators.required]),
      minimalRejections: new FormControl('',[Validators.required]),
    })
  }

  get actualLocation() {return this.checkoutForm.get('actualLocation');}
  get otherLocation() {return this.checkoutForm.get('otherLocation');}
  get minimalChecks() {return this.checkoutForm.get('minimalChecks');}
  get minimalRejections() {return this.checkoutForm.get('minimalRejections');}


}
