import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormService } from '../../../core/services/form/form.service';
import { NotificationService} from '../../../core/services/notification/notification.service'
import { CategoryProviderService} from '../../../core/providers/category/category-provider.service'
import { Category} from '../../../core/models/category.model'


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
  selectedCategory : Category;


  constructor(
    private activeRoute: ActivatedRoute,
    private formService:FormService,
    private categoryProviderService: CategoryProviderService,
    private notificationService: NotificationService,
    private router: Router
    
    ){
    this.checkoutForm;
    this.createFormGroup();
    this.form= new EventEmitter<FormGroup>();
    }

   async ngOnInit(): Promise<void> {

    this.setCategory();
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

  public async setCategory(): Promise<void> {
    this.activeRoute.params.subscribe(async (params) => {
      this.id = params.id || '';
      if (this.id) {
        try {
          const data: any = await this.categoryProviderService.getCategory(this.id).toPromise();
          this.selectedCategory = data.category;

          this.checkoutForm.setValue({
            name: data.name,
            description: data.description
          });
        } catch (error) {
          console.log(error);
          this.notificationService.error('No se ha podido cargar la categoría');
        }
      }
    });
  }

  cancel() {
    this.router.navigate(['admin/categories'])
  }

}
