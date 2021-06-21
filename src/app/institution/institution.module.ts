import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule} from '@agm/core';

import { InstitutionRoutingModule } from './institution-routing.module';
import { InstitutionComponent } from './institution.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordRecoveryComponent } from './screens/password-recovery/password-recovery.component';
import { VerifyCodeComponent } from './screens/verify-code/verify-code.component';
import { NewPasswordComponent } from './screens/new-password/new-password.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarBootstrapComponent } from './components/sidebar-bootstrap/sidebar-bootstrap.component';
import { ModalLogoutComponent } from './components/modal-logout/modal-logout.component';
import { ReportsScreenComponent } from './screens/reports-screen/reports-screen.component';
import { TableReportsComponent } from './components/table-reports/table-reports.component';
import { TableCasesComponent } from './components/table-cases/table-cases.component';
import { CasesScreenComponent } from './screens/cases-screen/cases-screen.component';
import { SettingsComponent } from './screens/settings/settings.component';
import { DetailReportComponent } from './components/detail-report/detail-report.component';
import { MapComponent } from './components/map/map.component';
import { GlobalMapComponent } from './components/global-map/global-map.component';


@NgModule({
  declarations: [InstitutionComponent, LoginScreenComponent, PasswordRecoveryComponent, VerifyCodeComponent,
     NewPasswordComponent, SidebarComponent, SidebarBootstrapComponent, ModalLogoutComponent, 
     ReportsScreenComponent, TableReportsComponent, TableCasesComponent, CasesScreenComponent, 
     SettingsComponent, DetailReportComponent, MapComponent, GlobalMapComponent],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCz0du8BFvXV2u4H8FeUWCLdmSwiSBy_cs'
    }),
  ]
})
export class InstitutionModule { }
