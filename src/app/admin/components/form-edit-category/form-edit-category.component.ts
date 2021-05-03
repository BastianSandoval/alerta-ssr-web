import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../core/services/form/form.service';

@Component({
  selector: 'app-form-edit-category',
  templateUrl: './form-edit-category.component.html',
  styleUrls: ['./form-edit-category.component.css']
})
export class FormEditCategoryComponent implements OnInit {

  checkoutForm: FormGroup;
  breeds?: string[];
  image?: string;
  id!: string;
  constructor(
    private activeRoute: ActivatedRoute,
    private formService:FormService,
    
    ){
    this.checkoutForm;
    this.createFormGroup();

    }

   async ngOnInit(): Promise<void> {
      // this.activeRoute.params.subscribe((params: Params) => {
      //   this.id = params.id;
      //   console.log('Id a buscar = ' +this.id + ' el perro encontrado = ' + this.wantedDog._id)
      // });
    };

  public saveCategory(event: Event){
    event.preventDefault(); 
  }

  private createFormGroup() {
      this.checkoutForm = this.formService.buildFormGroup({
      category: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
    })
  }

  public controlIsRequired(formControlName: string): boolean {
    return this.formService.controlIsRequired(this.checkoutForm, formControlName);
  }

  public controlIsInvalid(formControlName: string): boolean {
      return this.formService.controlIsInvalid(this.checkoutForm, formControlName);
  }

  public controlIsInvalidEmail(formControlName: string): boolean {
      return this.formService.controlIsInvalidEmail(this.checkoutForm, formControlName);
  }

  public controlIsInvalidPattern(formControlName: string): boolean {
    return this.formService.controlIsInvalidPattern(this.checkoutForm, formControlName);
  }

  public controlIsInvalidLength(formControlName: string): boolean {
    return this.formService.controlIsInvalidLength(this.checkoutForm, formControlName);
  }

  public enviar(){
    console.log(this.checkoutForm.value)
  }
}
