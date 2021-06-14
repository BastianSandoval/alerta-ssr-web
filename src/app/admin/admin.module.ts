import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '@shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditReportsScreenComponent } from './screens/edit-reports-screen/edit-reports-screen.component';
import { FormEditReportComponent } from './components/form-edit-report/form-edit-report.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableReportsComponent } from './components/table-reports/table-reports.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { SharedModule } from '@shared/shared.module';
import { ReportsScreenComponent } from './screens/reports-screen/reports-screen.component';
import { CategoryScreenComponent} from './screens/category-screen/category-screen.component'
import { CasesScreenComponent} from './screens/cases-screen/cases-screen.component';
import { DonationScreenComponent } from './screens/donation-screen/donation-screen.component';
import { TableDonationsComponent } from './components/table-donations/table-donations.component';
import { SettingsScreenComponent } from './screens/settings-screen/settings-screen.component';
import { TableCasesComponent } from './components/table-cases/table-cases.component'
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule} from '@agm/core';
import { SidebarBootstrapComponent } from './components/sidebar-bootstrap/sidebar-bootstrap.component';
import { EditCasesScreenComponent } from './screens/edit-cases-screen/edit-cases-screen.component';
import { EditCategorysScreenComponent } from './screens/edit-categorys-screen/edit-categorys-screen.component';
import { TableCategoryComponent } from './components/table-category/table-category.component';
import { FormEditCategoryComponent } from './components/form-edit-category/form-edit-category.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormEditCaseComponent } from './components/form-edit-case/form-edit-case.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { ModalLogoutComponent } from './components/modal-logout/modal-logout.component';
import { FormEditDonationComponent } from './components/form-edit-donation/form-edit-donation.component';
import { EditDonationScreenComponent } from './screens/edit-donation-screen/edit-donation-screen.component';

const component = [
  AdminComponent,SidebarComponent,
 TableReportsComponent,EditReportsScreenComponent,FormEditReportComponent
  , ModalDeleteComponent, ReportsScreenComponent, TableCategoryComponent,
  CategoryScreenComponent, CasesScreenComponent, DonationScreenComponent, TableDonationsComponent, SettingsScreenComponent,
  TableCasesComponent,MapComponent, SidebarBootstrapComponent, EditCasesScreenComponent, EditCategorysScreenComponent, TableCategoryComponent, FormEditCategoryComponent
  ,FormEditCaseComponent, LoginScreenComponent, ModalLogoutComponent
]

@NgModule({
  declarations: [...component, FormEditDonationComponent, EditDonationScreenComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
    GooglePlaceModule,
    ImageCropperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCz0du8BFvXV2u4H8FeUWCLdmSwiSBy_cs'
    }),
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: []
})

export class AdminModule { }
