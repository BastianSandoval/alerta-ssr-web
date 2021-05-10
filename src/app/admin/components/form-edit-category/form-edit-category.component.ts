import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { FormService } from '../../../core/services/form/form.service';

@Component({
  selector: 'app-form-edit-category',
  templateUrl: './form-edit-category.component.html',
  styleUrls: ['./form-edit-category.component.css']
})
export class FormEditCategoryComponent implements OnInit {

  @Output() form: EventEmitter<FormGroup>;

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
    this.form= new EventEmitter<FormGroup>();
    }

   async ngOnInit(): Promise<void> {
      // this.activeRoute.params.subscribe((params: Params) => {
      //   this.id = params.id;
      //   console.log('Id a buscar = ' +this.id + ' el perro encontrado = ' + this.wantedDog._id)
      // });
    };

    public exportForm(){
      this.form.emit(this.checkoutForm); // mandamos el form a la screen
    }
    public enviar(){
      this.exportForm();
    }

  public saveCategory(event: Event, categoryForm: FormGroupDirective ){
    event.preventDefault(); 
    if (categoryForm.valid)
    // console.log(categoryForm);
    categoryForm.resetForm(); // se resetea en esta parte, porque no se puede asignar como variable, porque la referencia no pasa al padre
  }

  private createFormGroup() {
      this.checkoutForm = this.formService.buildFormGroup({
      name: new FormControl('',[Validators.required]),
      // description: new FormControl('',[Validators.required]),
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
}
