import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { CategoryProviderService} from '../../../core/providers/category/category-provider.service';
import { NotificationService} from '../../../core/services/notification/notification.service';
import { Category} from '../../../core/models/category.model';


@Component({
  selector: 'app-edit-categorys-screen',
  templateUrl: './edit-categorys-screen.component.html',
  styleUrls: ['./edit-categorys-screen.component.css']
})
export class EditCategorysScreenComponent implements OnInit {

  id:string;
  form: FormGroup;

  constructor(private notificationService:NotificationService, 
              private categoryProviderService: CategoryProviderService, 
              private activatedRoute : ActivatedRoute,
              private router: Router) { 
    this.id= ''
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id || '';
      /* console.log('Id a buscar = ' +this.id + ' el perro encontrado = ' + this.wantedDog._id) */
    });
  }

  importForm(form: FormGroup){
    this.form= form;
    this.submitPlan();
  }

  public async submitPlan(): Promise<void> {
    if (this.form.valid) {
      if (this.id != '') {
        await this.updatePlan();
      } else {
        await this.addPlan(this.form);
      }
    }
  }

  public async addPlan(form: FormGroup): Promise<void> {
    try {
      this.router.navigate(['admin/category']);
      await this.categoryProviderService.addCategory(this.form.value).toPromise();
      this.notificationService.success('La categoría ha sido creada');
      this.form.reset();
    } catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido crear la categoría');
    }
  }

  public async updatePlan(): Promise<void> {
    try {
      console.log(this.form.value);
      this.router.navigate(['admin/category']);
      await this.categoryProviderService.updateCategory(this.id, this.form.value as Category).toPromise();
      this.notificationService.success('La categoría ha sido actualizado');
    } catch (error) {
      console.log(error);
      this.notificationService.error('No se ha podido actualizar la categoría');
    }
  }


}
