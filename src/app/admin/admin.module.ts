import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/modules/material/material.module';
import { SharedModule } from '@shared/shared.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ImageCropperModule } from 'ngx-image-cropper';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { DetailReportComponent } from './components/detail-report/detail-report.component';
import { FormEditCaseComponent } from './components/form-edit-case/form-edit-case.component';
import { FormEditCategoryComponent } from './components/form-edit-category/form-edit-category.component';
import { FormEditDonationComponent } from './components/form-edit-donation/form-edit-donation.component';
import { FormEditInstitutionsComponent } from './components/form-edit-institutions/form-edit-institutions.component';
import { FormEditReportComponent } from './components/form-edit-report/form-edit-report.component';
import { FormEditTendersComponent } from './components/form-edit-tenders/form-edit-tenders.component';
import { GlobalMapComponent } from './components/global-map/global-map.component';
import { InstitutionInfoComponent } from './components/institution-info/institution-info.component';
import { MapComponent } from './components/map/map.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { ModalLogoutComponent } from './components/modal-logout/modal-logout.component';
import { SidebarBootstrapComponent } from './components/sidebar-bootstrap/sidebar-bootstrap.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableCasesComponent } from './components/table-cases/table-cases.component';
import { TableCategoryComponent } from './components/table-category/table-category.component';
import { TableDonationsComponent } from './components/table-donations/table-donations.component';
import { TableInstitutionsComponent } from './components/table-institutions/table-institutions.component';
import { TableReportsComponent } from './components/table-reports/table-reports.component';
import { TableTendersComponent } from './components/table-tenders/table-tenders.component';
import { TableValidatorsComponent } from './components/table-validators/table-validators.component';
import { CasesScreenComponent } from './screens/cases-screen/cases-screen.component';
import { CategoryScreenComponent } from './screens/category-screen/category-screen.component';
import { DonationScreenComponent } from './screens/donation-screen/donation-screen.component';
import { EditCasesScreenComponent } from './screens/edit-cases-screen/edit-cases-screen.component';
import { EditCategorysScreenComponent } from './screens/edit-categorys-screen/edit-categorys-screen.component';
import { EditDonationScreenComponent } from './screens/edit-donation-screen/edit-donation-screen.component';
import { EditInstitutionsScreenComponent } from './screens/edit-institutions-screen/edit-institutions-screen.component';
import { EditReportsScreenComponent } from './screens/edit-reports-screen/edit-reports-screen.component';
import { InstitutionInfoScreenComponent } from './screens/institution-info-screen/institution-info-screen.component';
import { InstitutionsScreenComponent } from './screens/institutions-screen/institutions-screen.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { ReportsScreenComponent } from './screens/reports-screen/reports-screen.component';
import { SettingsScreenComponent } from './screens/settings-screen/settings-screen.component';
import { TendersScreenComponent } from './screens/tenders-screen/tenders-screen.component';

const component = [
  AdminComponent,SidebarComponent,
 TableReportsComponent,EditReportsScreenComponent,FormEditReportComponent
  , ModalDeleteComponent, ReportsScreenComponent, TableCategoryComponent,
  CategoryScreenComponent, CasesScreenComponent, DonationScreenComponent, TableDonationsComponent, SettingsScreenComponent,
  TableCasesComponent, GlobalMapComponent ,MapComponent, SidebarBootstrapComponent, EditCasesScreenComponent, EditCategorysScreenComponent, TableCategoryComponent, FormEditCategoryComponent
  ,FormEditCaseComponent, LoginScreenComponent, ModalLogoutComponent, DetailReportComponent
]

@NgModule({
  declarations: [...component, FormEditDonationComponent, EditDonationScreenComponent, InstitutionsScreenComponent, TableInstitutionsComponent, EditInstitutionsScreenComponent, FormEditInstitutionsComponent, TableValidatorsComponent, InstitutionInfoComponent, InstitutionInfoScreenComponent, TendersScreenComponent, TableTendersComponent, FormEditTendersComponent, CustomTableComponent],
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
