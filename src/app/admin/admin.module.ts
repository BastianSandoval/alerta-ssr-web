import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '@shared/modules/material/material.module';
import { AddDogScreenComponent } from './screens/add-dog-screen/add-dog-screen.component';
import { FormAddDogComponent } from './components/form-add-dog/form-add-dog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditDogScreenComponent } from './screens/edit-dog-screen/edit-dog-screen.component';
import { FormEditDogComponent } from './components/form-edit-dog/form-edit-dog.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ListDogsScreenComponent } from './screens/list-dogs-screen/list-dogs-screen.component';
import { TableDogsComponent } from './components/table-dogs/table-dogs.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { ModalImageComponent } from './components/modal-image/modal-image.component';

const component = [
  AdminComponent, AddDogScreenComponent, FormAddDogComponent, SidebarComponent,
  ListDogsScreenComponent, TableDogsComponent,EditDogScreenComponent,FormEditDogComponent
  , ModalDeleteComponent, ModalEditComponent, ModalImageComponent
]

@NgModule({
  declarations: [...component],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})

export class AdminModule { }
