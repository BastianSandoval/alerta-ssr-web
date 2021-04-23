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
import { TableReportsComponent } from './components/table-reports/table-reports.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { ModalImageComponent } from './components/modal-image/modal-image.component';
import { SharedModule } from '@shared/shared.module';
import { ReportsScreenComponent } from './screens/reports-screen/reports-screen.component';
import { TableCategoryComponent } from './components/table-category/table-category/table-category.component';
import { CategoryScreenComponent} from './screens/category-screen/category-screen.component'
import { CasesScreenComponent} from './screens/cases-screen/cases-screen.component';
import { DonationScreenComponent } from './screens/donation-screen/donation-screen.component';
import { TableDonationsComponent } from './components/table-donations/table-donations.component';
import { SettingsScreenComponent } from './screens/settings-screen/settings-screen.component';
import { TableCasesComponent } from './components/table-cases/table-cases.component'
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule} from '@agm/core';
import { SidebarBootstrapComponent } from './components/sidebar-bootstrap/sidebar-bootstrap.component';

const component = [
  AdminComponent, AddDogScreenComponent, FormAddDogComponent, SidebarComponent,
 TableReportsComponent,EditDogScreenComponent,FormEditDogComponent
  , ModalDeleteComponent, ModalEditComponent, ModalImageComponent, ReportsScreenComponent, TableCategoryComponent,
  CategoryScreenComponent, CasesScreenComponent, DonationScreenComponent, TableDonationsComponent, SettingsScreenComponent,
  TableCasesComponent,MapComponent
]

@NgModule({
  declarations: [...component, SidebarBootstrapComponent ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCz0du8BFvXV2u4H8FeUWCLdmSwiSBy_cs'
    }),

  ]
})

export class AdminModule { }
