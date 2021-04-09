import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '@shared/modules/material/material.module';
import { AddDogScreenComponent } from './screens/add-dog-screen/add-dog-screen.component';
import { FormAddDogComponent } from './components/form-add-dog/form-add-dog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDogScreenComponent } from './screens/edit-dog-screen/edit-dog-screen.component';
import { FormEditDogComponent } from './components/form-edit-dog/form-edit-dog.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ListDogsScreenComponent } from './screens/list-dogs-screen/list-dogs-screen.component';
import { TableReportsComponent } from './components/table-reports/table-reports.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { ModalImageComponent } from './components/modal-image/modal-image.component';
import { SharedModule } from '@shared/shared.module';
import { ReportsScreenComponent } from './screens/reports-screen/reports-screen.component';

const component = [
  AdminComponent, AddDogScreenComponent, FormAddDogComponent, SidebarComponent,
  ListDogsScreenComponent, TableReportsComponent,EditDogScreenComponent,FormEditDogComponent
  , ModalDeleteComponent, ModalEditComponent, ModalImageComponent, ReportsScreenComponent
]

@NgModule({
  declarations: [...component],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})

export class AdminModule { }
